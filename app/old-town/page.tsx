import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/lib/tours';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Старе місто Львова | Середньовічний Львів | Екскурсії | Ірина Красіцька',
  description:
    "Екскурсії по старому місту Львова. Середньовічні квартали, кам'яниці, легенди та історії. Замовити екскурсію по старому Львову!",
  keywords: "старе місто Львова, середньовічний Львів, старий Львів, екскурсії старе місто, кам'яниці Львова",
  alternates: {
    canonical: `${baseUrl}/old-town`,
  },
  openGraph: {
    title: 'Старе місто Львова | Середньовічний Львів',
    description: 'Екскурсії по старому місту Львова з професійним гідом Іриною Красіцькою.',
    url: `${baseUrl}/old-town`,
    type: 'website',
  },
};

const oldTownTours = tours.filter(
  (tour) =>
    tour.title.includes('Середньовічний') ||
    tour.title.includes('Легенди') ||
    tour.title.includes('Підземелля') ||
    tour.tags?.includes('Історія'),
);

export default function OldTownPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Старе місто Львова',
    description: 'Середньовічне ядро Львова з унікальною архітектурою та історією',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Львів',
      addressRegion: 'Львівська область',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '49.8397',
      longitude: '24.0297',
    },
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
                { label: 'Старе місто', href: '/old-town' },
              ]}
            />
          </div>
          <section className="bg-white py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Старе місто Львова</h1>
                <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                  Середньовічне ядро Львова - це місце, де кожна кам'яниця, кожна вулиця розповідає свою історію. Тут
                  час зупинився, але історія продовжує жити.
                </p>
              </div>

              <div className="mb-12 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Про старе місто</h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    Старе місто Львова - це унікальний комплекс середньовічної архітектури, який зберігся до наших днів.
                    Тут можна побачити, як жили міщани, ремісники та аристократи в XVI-XVIII століттях.
                  </p>
                  <p>
                    Кожна кам'яниця на площі Ринок має свою історію. Тут жили купці, які торгували з усією Європою,
                    ремісники, які створювали унікальні вироби, та аристократи, які формували культурне життя міста.
                  </p>
                  <p>
                    Підземелля старого міста приховують багато таємниць - від середньовічних льохів до підземних ходів,
                    які з'єднували різні частини міста.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="mb-8 text-3xl font-bold text-gray-900">Екскурсії по старому місту</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {oldTownTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      className="group rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                          {tour.title}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-gray-600">{tour.description.substring(0, 150)}...</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-purple-600">{tour.price}</span>
                          <span className="text-gray-500">{tour.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-indigo-50 p-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Замовити екскурсію по старому місту</h2>
                <p className="mb-6 text-lg text-gray-700">
                  Хочете зануритися в атмосферу середньовічного Львова? Замовте екскурсію!
                </p>
                <Link
                  href="/#contact"
                  className="inline-block rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  Замовити екскурсію
                </Link>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
