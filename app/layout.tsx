import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: {
    default: 'Екскурсовод Львів | Ірина Красіцька | Професійні екскурсії',
    template: '%s | Ірина Красіцька',
  },
  description:
    'Професійний екскурсовод у Львові Ірина Красіцька. Авторські екскурсії по історичному центру Львова, легенди, архітектура, кавовий Львів. Індивідуальні та групові тури від 200 грн. Замовити екскурсію зараз!',
  keywords:
    'Ірина Красіцька, екскурсовод Львів, екскурсії Львів, тури Львів, гід Львів, екскурсії по Львову, львівський екскурсовод, індивідуальні екскурсії Львів, групові тури Львів, історичний центр Львова',
  authors: [{ name: 'Ірина Красіцька' }],
  creator: 'Ірина Красіцька',
  publisher: 'Ірина Красіцька',
  openGraph: {
    title: 'Екскурсовод Львів | Ірина Красіцька | Професійні екскурсії',
    description:
      'Професійний екскурсовод у Львові Ірина Красіцька. Організація цікавих та незабутніх екскурсій по історичному центру Львова та околицях.',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Екскурсії з Іриною Красіцькою',
    images: [
      {
        url: '/images/guide-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Ірина Красіцька - екскурсовод у Львові',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Екскурсовод Львів | Ірина Красіцька | Професійні екскурсії',
    description: 'Професійний екскурсовод у Львові Ірина Красіцька. Організація цікавих та незабутніх екскурсій.',
    images: ['/images/guide-photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com'}/feed.xml`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com'}/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristInformationCenter',
              name: 'Екскурсії з Іриною Красіцькою',
              description:
                'Професійний екскурсовод у Львові Ірина Красіцька. Організація цікавих та незабутніх екскурсій по історичному центру Львова та околицях.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com',
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com'}/images/guide-photo.jpg`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Львів',
                addressRegion: 'Львівська область',
                addressCountry: 'UA',
              },
              areaServed: {
                '@type': 'City',
                name: 'Львів',
              },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Екскурсії по Львову',
                  price: '200',
                  priceCurrency: 'UAH',
                  availability: 'https://schema.org/InStock',
                  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com',
                },
              ],
              telephone: '+380975383348',
              priceRange: '200 UAH',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ірина Красіцька',
              jobTitle: 'Екскурсовод у Львові',
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com'}/images/guide-photo.jpg`,
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Львів',
                addressCountry: 'UA',
              },
              knowsAbout: [
                'Екскурсії по Львову',
                'Історія Львова',
                'Архітектура Львова',
                'Культура України',
                'Легенди Львова',
              ],
              telephone: '+380975383348',
              email: 'krasiraira@gmail.com',
              sameAs: [
                'https://www.instagram.com/ekskursii.lviv/',
                'https://www.facebook.com/irina.krasic.ka.55959',
                'https://www.tiktok.com/@iryna_ekscurs_',
                'viber://chat?number=%2B380975383348',
              ],
            }),
          }}
        />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
