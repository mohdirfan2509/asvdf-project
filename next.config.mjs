/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep firebase-admin external so Vercel uses the pinned CJS-compatible jose@4
  serverExternalPackages: ['firebase-admin'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

export default nextConfig;
