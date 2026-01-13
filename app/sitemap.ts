import { MetadataRoute } from 'next';
import { tours } from '@/lib/tours';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');

  const tourPages = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    // Add images to sitemap
    images: [
      {
        loc: `${baseUrl}${tour.image}`,
        title: tour.title,
        caption: tour.description.substring(0, 100),
      },
    ],
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        {
          loc: `${baseUrl}/images/guide-photo.jpg`,
          title: 'Ірина Красіцька - екскурсовод у Львові',
          caption: 'Професійний екскурсовод у Львові Ірина Красіцька',
        },
      ],
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...tourPages,
  ];
}
