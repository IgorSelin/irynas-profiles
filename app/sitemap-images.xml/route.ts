import { NextResponse } from 'next/server';
import { tours } from '@/lib/tours';
import { blogPosts } from '@/lib/blogPosts';

const staticPhotos = [
  { id: 1, src: '/images/tour-opera.webp', alt: 'Оперний театр' },
  { id: 2, src: '/images/tour-lychakiv.webp', alt: 'Личаківський цвинтар' },
  { id: 3, src: '/images/tour-medieval.webp', alt: 'Середньовічний Львів' },
  { id: 4, src: '/images/tour-underground.webp', alt: 'Підземелля Львова' },
  { id: 5, src: '/images/tour-austrian.webp', alt: 'Австрійський Львів' },
  { id: 6, src: '/images/tour-bus.webp', alt: 'Автобусна екскурсія' },
  { id: 7, src: '/images/additional-shevchenkivskyi-hai.webp', alt: 'Шевченківський гай' },
  { id: 8, src: '/images/additional-tustan.webp', alt: 'Тустань' },
  { id: 9, src: '/images/additional-waterfall.webp', alt: "Водоспад Кам'янка" },
  { id: 10, src: '/images/additional-ternopil-castles.webp', alt: 'Замки Тернопілля' },
  { id: 11, src: '/images/additional-golden-horseshoe.webp', alt: 'Золота підкова' },
  { id: 13, src: '/images/additional-poland-lancut.webp', alt: 'Ланьцут' },
  { id: 14, src: '/images/additional-poland-krasiczyn.webp', alt: 'Красічин' },
  { id: 15, src: '/images/additional-poland-solina.webp', alt: 'Соліна' },
  { id: 16, src: '/images/tour-stryiskyi.webp', alt: 'Стрийський парк' },
  { id: 17, src: '/images/vechirniy-lviv.webp', alt: 'Вечірній Львів' },
  { id: 18, src: '/images/tour-coffee.webp', alt: 'Кавовий Львів' },
  { id: 19, src: '/images/tour-beer.webp', alt: 'Пивний Львів' },
  { id: 20, src: '/images/tour-carlson.webp', alt: 'Львів з висоти' },
  { id: 21, src: '/images/tour-castelivka.webp', alt: 'Вілли Кастелівки' },
  { id: 22, src: '/images/tour-legends.webp', alt: 'Легенди Львова' },
  { id: 23, src: '/images/tour-zno.webp', alt: 'Історія для ЗНО' },
  { id: 24, src: '/images/kaplytsia_boimiv.webp', alt: 'Біблійний Львів' },
  { id: 25, src: '/images/karta-polaka.webp', alt: 'Карта поляка' },
  { id: 26, src: '/images/tour-professors.webp', alt: 'Розстріл професорів' },
  { id: 27, src: '/images/tour-synevyr.webp', alt: 'Озеро Синевир' },
  { id: 28, src: '/images/additional-zhovkva-krekhiv.webp', alt: 'Жовква та Крехів' },
];

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com').replace(/\/+$/, '');

  const imageGroups: Record<
    string,
    Array<{ loc: string; caption?: string; title?: string; geoLocation?: string }>
  > = {};

  imageGroups[baseUrl] = [
    {
      loc: `${baseUrl}/images/guide-photo.webp`,
      caption: 'Ірина Красіцька - професійний екскурсовод у Львові',
      title: 'Ірина Красіцька - екскурсовод у Львові',
      geoLocation: 'Львів, Україна',
    },
  ];

  tours.forEach((tour) => {
    if (tour.image) {
      const tourUrl = `${baseUrl}/tours/${tour.slug}`;
      if (!imageGroups[tourUrl]) {
        imageGroups[tourUrl] = [];
      }
      imageGroups[tourUrl].push({
        loc: `${baseUrl}${tour.image}`,
        caption: tour.description.substring(0, 200),
        title: tour.title,
        geoLocation: 'Львів, Україна',
      });
    }
  });

  Object.entries(blogPosts).forEach(([slug, post]) => {
    if (post.image) {
      const blogUrl = `${baseUrl}/blog/${slug}`;
      if (!imageGroups[blogUrl]) {
        imageGroups[blogUrl] = [];
      }
      imageGroups[blogUrl].push({
        loc: `${baseUrl}${post.image}`,
        caption: post.description ||post.imageCaption,
        title: post.title,
        geoLocation: 'Львів, Україна',
      });
    }
  });

  const galleryUrl = `${baseUrl}/gallery`;
  imageGroups[galleryUrl] = staticPhotos.map((photo) => ({
    loc: `${baseUrl}${photo.src}`,
    caption: photo.alt,
    title: photo.alt,
    geoLocation: 'Львів, Україна',
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${Object.entries(imageGroups)
  .map(
    ([pageUrl, images]) => `  <url>
    <loc>${pageUrl}</loc>
${images
  .map(
    (image) => `    <image:image>
      <image:loc>${image.loc}</image:loc>
      ${image.caption ? `<image:caption><![CDATA[${image.caption}]]></image:caption>` : ''}
      ${image.title ? `<image:title><![CDATA[${image.title}]]></image:title>` : ''}
      ${image.geoLocation ? `<image:geo_location>${image.geoLocation}</image:geo_location>` : ''}
    </image:image>`,
  )
  .join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
