import { Metadata } from 'next';
import Reviews from '@/components/Reviews';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getReviews } from '@/lib/serverReviews';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Всі відгуки | Ірина Красіцька | Екскурсії по Львову',
  description:
    'Відгуки про екскурсії по Львову з Іриною Красіцькою. Реальні оцінки та коментарі від задоволених туристів. 5 зірок, професійний підхід, цікаві історії. Читати всі відгуки.',
  keywords: 'відгуки Ірина Красіцька, відгуки екскурсовод Львів, оцінки екскурсій Львів, відгуки туристів Львів',
  alternates: {
    canonical: `${baseUrl}/reviews`,
  },
  openGraph: {
    title: 'Всі відгуки | Ірина Красіцька | Екскурсії по Львову',
    description:
      'Відгуки про екскурсії по Львову з Іриною Красіцькою. Реальні оцінки та коментарі від задоволених туристів. 5 зірок, професійний підхід, цікаві історії. Читати всі відгуки.',
    url: `${baseUrl}/reviews`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/guide-photo.webp`,
        width: 1200,
        height: 630,
        alt: 'Відгуки про екскурсії з Іриною Красіцькою',
      },
    ],
  },
};

// Re-render hourly so new reviews and replies reach the HTML that crawlers read
export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Reviews initialReviews={reviews} />
      </div>
      <Footer />
    </main>
  );
}
