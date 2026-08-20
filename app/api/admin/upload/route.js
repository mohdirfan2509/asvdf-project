import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/admin/auth';
import { isCloudinaryConfigured, uploadImageToCloudinary } from '@/lib/cloudinary';

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

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
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
