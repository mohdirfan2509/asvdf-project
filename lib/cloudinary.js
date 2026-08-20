import { v2 as cloudinary } from 'cloudinary';

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      !process.env.CLOUDINARY_CLOUD_NAME.includes('your-cloud')
  );
}

export function configureCloudinary() {
  if (!isCloudinaryConfigured()) return false;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return true;
}

/**
 * Upload a buffer/file to Cloudinary. Returns secure HTTPS URL.
 */
export async function uploadImageToCloudinary(buffer, { folder = 'asvdf', filename } = {}) {
  if (!configureCloudinary()) {
    throw new Error('Cloudinary is not configured');
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename ? filename.replace(/\.[^.]+$/, '') : undefined,
        resource_type: 'image',
        overwrite: false,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
    stream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}
