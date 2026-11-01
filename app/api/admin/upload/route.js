import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/admin/auth';
import { isCloudinaryConfigured, uploadImageToCloudinary } from '@/lib/cloudinary';

const MAX_BYTES = 8 * 1024 * 1024;

/** Detects the image type from the file's first bytes; the browser-supplied name and type are not trusted. */
function imageExtension(bytes) {
  const ascii = (start, end) => bytes.subarray(start, end).toString('latin1');
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpg';
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (ascii(0, 6) === 'GIF87a' || ascii(0, 6) === 'GIF89a') return 'gif';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'webp';
  if (ascii(4, 8) === 'ftyp' && ['avif', 'avis'].includes(ascii(8, 12))) return 'avif';
  return null;
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is too large (8 MB maximum).' }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = imageExtension(bytes);
  if (!ext) {
    return NextResponse.json({ error: 'Only JPG, PNG, WebP, GIF or AVIF images can be uploaded.' }, { status: 415 });
  }
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  if (isCloudinaryConfigured()) {
    try {
      const uploaded = await uploadImageToCloudinary(bytes, {
        folder: process.env.CLOUDINARY_FOLDER || 'asvdf',
        filename,
      });
      return NextResponse.json({
        url: uploaded.url,
        provider: 'cloudinary',
        publicId: uploaded.publicId,
      });
    } catch (err) {
      return NextResponse.json({ error: err.message || 'Cloudinary upload failed' }, { status: 500 });
    }
  }

  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), bytes);
  return NextResponse.json({
    url: `/uploads/${filename}`,
    provider: 'local',
    warning: 'Set CLOUDINARY_* in .env.local for cloud image hosting.',
  });
}
