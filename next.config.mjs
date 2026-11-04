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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'Content-Security-Policy', value: "frame-ancestors 'none'" }],
      },
    ];
  },
  async redirects() {
    return [
      // Concrete repair & restoration is no longer offered; its page was replaced by Bar Bending Services.
      { source: '/concrete-repair-restoration', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
