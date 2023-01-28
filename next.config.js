/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['localhost', 'cdn.sanity.io', 'res.cloudinary.com'],
  },
  rewrites: () => [STUDIO_REWRITE],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

const STUDIO_REWRITE = {
  source: '/admin/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/admin/:path*'
      : '/admin/index.html',
};
