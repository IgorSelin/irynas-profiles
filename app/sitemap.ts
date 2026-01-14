import { MetadataRoute } from 'next';
import { tours } from '@/lib/tours';
import { blogPosts } from '@/lib/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');

  const lastMainPageUpdate = new Date('2026-01-11');
  const lastToursPageUpdate = new Date('2026-01-11');
  const lastToursUpdate = new Date('2026-01-11');
  const lastGalleryUpdate = new Date('2026-01-11');
  const lastReviewsUpdate = new Date();

  const tourPages = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: lastToursUpdate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = Object.entries(blogPosts).map(([slug, post]) => ({
    url: `${baseUrl}/blog/${slug}`,
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
      lastModified: lastMainPageUpdate,
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
