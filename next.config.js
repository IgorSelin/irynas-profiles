/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize CSS loading - inline critical CSS to reduce render-blocking
  experimental: {
    optimizeCss: true, // Inline critical CSS
    cssChunking: 'strict', // 'strict' | 'loose'
  },
  // Enable compression
  compress: true,
  // Optimize production builds (SWC minification is default in Next.js 14)
  swcMinify: true,
};

module.exports = nextConfig;
