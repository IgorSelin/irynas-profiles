import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');

  return {
    // One group for all crawlers (Google, Bing, ChatGPT search): some bots only read the first matching group.
    // Don't disallow /_next/: page images are served from /_next/image and CSS/JS from /_next/static.
    rules: {
      userAgent: '*',
      allow: ['/', '/api/reviews', '/api/photos'],
      disallow: ['/api/', '/admin/', '/keystatic/', '/private/'],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-images.xml`],
  };
}
