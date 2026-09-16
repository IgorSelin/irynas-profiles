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
    // Content managed by Keystatic is read from disk at build/request time
    outputFileTracingIncludes: {
      '/**': ['./content/**/*'],
    },
  },
  // Blog images moved to Keystatic's per-post folders; keep old URLs (Google Images, social previews) working
  async redirects() {
    return [
      ['kulchytsky-street-1885-sculpture.webp', 'kulychytskyi'],
      ['lviv-first-time.webp', 'lviv-first-time'],
      ['lviv-monasteries.webp', 'lviv-kupci-chenci'],
      ['torgovi-shlyakhy-lvova.webp', 'torgovi-shlyakhy-lvova'],
      ['virmenska-street.webp', 'virmenskyi-lviv'],
    ].map(([file, slug]) => ({
      source: `/images/${file}`,
      destination: `/images/blog/${slug}/image.webp`,
      permanent: true,
    }));
  },
  // Enable compression
  compress: true,
  // Optimize production builds (SWC minification is default in Next.js 14)
  swcMinify: true,
};

module.exports = nextConfig;
