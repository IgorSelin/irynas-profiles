import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TourDetail from '@/components/TourDetail';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { tours } from '@/lib/tours';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tour = tours.find((t) => t.slug === params.id || t.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

  if (!tour) {
    return {
      title: 'Тур не знайдено',
    };
  }

  const tourUrl = `${baseUrl}/tours/${tour.slug}`;

  return {
    title: `${tour.title} | Ірина Красіцька | Екскурсії по Львову`,
    description: `${tour.description.substring(0, 120)}... Авторська екскурсія від Ірини Красіцької. Тривалість: ${tour.duration}. Ціна: ${tour.price}. Замовити екскурсію зараз!`,
    keywords: `${tour.title}, екскурсія Львів, ${tour.tags?.join(', ') || ''}, Ірина Красіцька`,
    alternates: {
      canonical: tourUrl,
    },
    openGraph: {
      title: `${tour.title} | Ірина Красіцька | Екскурсії по Львову`,
      description: `${tour.description} Авторська екскурсія від Ірини Красіцької.`,
      url: tourUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}${tour.image}`,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
    },
  };
}

export default function TourPage({ params }: { params: { id: string } }) {
  const tour = tours.find((t) => t.slug === params.id || t.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

  if (!tour) {
    notFound();
  }

  // Extract price number from "200 грн/ос" format
  const priceMatch = tour.price?.match(/(\d+)/);
  const priceValue = priceMatch ? priceMatch[1] : '200';

  // Extract duration in hours from "2 години" format
  const durationMatch = tour.duration?.match(/(\d+)/);
  const durationHours = durationMatch ? durationMatch[1] : '2';

  const tourUrl = `${baseUrl}/tours/${tour.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    image: `${baseUrl}${tour.image}`,
    url: tourUrl,
    provider: {
      '@type': 'Person',
      name: 'Ірина Красіцька',
      jobTitle: 'Екскурсовод у Львові',
      telephone: '+380975383348',
      email: 'krasiraira@gmail.com',
    },
    location: {
      '@type': 'City',
      name: 'Львів',
      addressCountry: 'UA',
    },
    offers: {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
      url: tourUrl,
      validFrom: new Date().toISOString(),
    },
    duration: `PT${durationHours}H`,
    itinerary: tour.highlights?.map((highlight) => ({
      '@type': 'TouristDestination',
      name: highlight,
    })),
    keywords: tour.tags?.join(', '),
    inLanguage: tour.languages || ['uk', 'pl'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: 'Головна', href: '/' },
                { label: 'Екскурсії', href: '/tours' },
                { label: tour.title, href: `/tours/${tour.slug}` },
              ]}
            />
          </div>
          <TourDetail tour={tour} />
        </div>
        <Footer />
      </main>
    </>
  );
}
