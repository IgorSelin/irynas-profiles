import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { tours } from '@/lib/tours';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Екскурсії по центру Львова | Історичний центр | Ірина Красіцька',
  description:
    'Екскурсії по історичному центру Львова з професійним гідом. Площа Ринок, Оперний театр, Вірменський квартал. Замовити екскурсію зараз!',
  keywords:
    'екскурсії центр Львова, історичний центр Львова, площа Ринок, Оперний театр Львів, екскурсії по центру міста',
  alternates: {
    canonical: `${baseUrl}/lviv-center`,
  },
  openGraph: {
    title: 'Екскурсії по центру Львова | Історичний центр',
    description: 'Екскурсії по історичному центру Львова з професійним гідом Іриною Красіцькою.',
    url: `${baseUrl}/lviv-center`,
    type: 'website',
  },
};

const centerTours = tours.filter(
  (tour) =>
    tour.tags?.includes('Центр міста') ||
    tour.title.includes('Середньовічний') ||
    tour.title.includes('Підземелля') ||
    tour.title.includes('Австрійський'),
);

export default function LvivCenterPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Історичний центр Львова',
    description: "Екскурсії по історичному центру Львова - об'єкт Всесвітньої спадщини ЮНЕСКО",
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
                { label: 'Центр Львова', href: '/lviv-center' },
              ]}
            />
          </div>
          <section className="bg-white py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Екскурсії по центру Львова</h1>
                <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                  Історичний центр Львова внесений до списку Всесвітньої спадщини ЮНЕСКО. Це унікальний архітектурний
                  ансамбль, який зберігся з середньовіччя. Площа Ринок, Оперний театр, Вірменський квартал - все це
                  чекає на вас!
                </p>
              </div>

              <div className="mb-12 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Про історичний центр</h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    Історичний центр Львова - це унікальний комплекс пам'яток архітектури, який формувався протягом
                    багатьох століть. Тут поєднуються різні архітектурні стилі: готика, ренесанс, бароко, класицизм.
                  </p>
                  <p>
                    Площа Ринок - серце старого міста, оточена 44 кам'яницями, кожна з яких має свою унікальну історію.
                    Оперний театр - перлина австрійського періоду, один з найкрасивіших театрів Європи.
                  </p>
                  <p>
                    Вірменський квартал зберігає атмосферу середньовіччя, а підземелля міста приховують багато таємниць
                    та легенд.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="mb-8 text-3xl font-bold text-gray-900">Екскурсії по центру Львова</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {centerTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      className="group rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
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

              <div className="rounded-lg bg-purple-50 p-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Замовити екскурсію по центру Львова</h2>
                <p className="mb-6 text-lg text-gray-700">
                  Хочете дізнатися більше про історичний центр Львова? Замовте екскурсію з професійним гідом!
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
