import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Контакти | Ірина Красіцька | Екскурсовод у Львові',
  description:
    'Зв\'яжіться з Іриною Красіцькою для замовлення екскурсії по Львову. Телефон: +380975383348, Email: krasiraira@gmail.com. Екскурсії щодня!',
  keywords:
    'контакти Ірина Красіцька, зателефонувати екскурсовод Львів, замовити екскурсію Львів, телефон гід Львів',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: 'Контакти | Ірина Красіцька | Екскурсовод у Львові',
    description:
      'Зв\'яжіться з Іриною Красіцькою для замовлення екскурсії по Львову. Телефон: +380975383348, Email: krasiraira@gmail.com.',
    url: `${baseUrl}/contact`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/guide-photo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Контакти Ірини Красіцької',
      },
    ],
  },
};

export default function ContactPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ірина Красіцька - Екскурсовод у Львові',
    image: `${baseUrl}/images/guide-photo.jpg`,
    telephone: '+380975383348',
    email: 'krasiraira@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressRegion: 'Львівська область',
      postalCode: '79000',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '49.8397',
      longitude: '24.0297',
    },
    openingHours: 'Mo-Su 09:00-20:00',
    priceRange: '200-500 UAH',
    url: baseUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: 'Головна', href: '/' },
                { label: 'Контакти', href: '/contact' },
              ]}
            />
          </div>
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
