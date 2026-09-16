import { MetadataRoute } from 'next';
import { getBlogPosts, getTours } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');

  const lastMainPageUpdate = new Date('2026-01-16');
  const lastToursPageUpdate = new Date('2026-01-16');
  const lastToursUpdate = new Date('2026-01-16');
  const lastGalleryUpdate = new Date('2026-01-16');
  const lastBlogUpdate = new Date('2026-01-16');
  const lastReviewsUpdate = new Date();

  const [tours, blogPosts] = await Promise.all([getTours(), getBlogPosts()]);

  const tourPages = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: lastToursUpdate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastMainPageUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: lastToursPageUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: lastGalleryUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: lastReviewsUpdate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastMainPageUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastBlogUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lviv-center`,
      lastModified: lastToursUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/old-town`,
      lastModified: lastToursUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...blogPages,
    ...tourPages,
  ];
}
