import { NextResponse } from 'next/server';
import { tours } from '@/lib/tours';

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');
  const siteTitle = 'Екскурсії з Іриною Красіцькою';
  const siteDescription =
    'Професійний екскурсовод у Львові Ірина Красіцька. Авторські екскурсії по історичному центру Львова, легенди, архітектура, кавовий Львів.';

  const lastBuildDate = new Date('2026-01-11').toUTCString();
  const pubDate = new Date('2026-01-11').toUTCString();

  const feedItems = [
    {
      title: 'Нові авторські екскурсії по Львову',
      link: `${baseUrl}/tours`,
      description:
        'Ознайомтесь з авторськими екскурсіями по Львову від Ірини Красіцької. Історичний центр, легенди, кавовий Львів та архітектурні перлини.',
      pubDate: pubDate,
      guid: `${baseUrl}/tours`,
    },
    ...tours.slice(0, 10).map((tour) => ({
      title: tour.title,
      link: `${baseUrl}/tours/${tour.slug}`,
      description: tour.description.substring(0, 300) + '...',
      pubDate: new Date('2026-01-11').toUTCString(),
      guid: `${baseUrl}/tours/${tour.slug}`,
    })),
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>uk-UA</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${feedItems
      .map(
        (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`,
      )
      .join('\n')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
