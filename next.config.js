/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['localhost', 'cdn.sanity.io'],
  },
};

const STUDIO_REWRITE = {
  source: '/admin/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/admin/:path*'
      : '/admin/index.html',
};

module.exports = {
  rewrites: () => [STUDIO_REWRITE],
};
