/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  serverExternalPackages: ['firebase-admin'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  async redirects() {
    return [
      // Concrete repair & restoration is no longer offered; its page was replaced by Bar Bending Services.
      { source: '/concrete-repair-restoration', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
