import { Metadata } from 'next';
import Reviews from '@/components/Reviews';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Всі відгуки | Ірина Красіцька | Екскурсії по Львову',
  description: 'Що кажуть наші гості про екскурсії по Львову з Іриною Красіцькою. Реальні відгуки та оцінки від задоволених туристів.',
  keywords: 'відгуки Ірина Красіцька, відгуки екскурсовод Львів, оцінки екскурсій Львів, відгуки туристів Львів',
  alternates: {
    canonical: `${baseUrl}/reviews`,
  },
  openGraph: {
    title: 'Всі відгуки | Ірина Красіцька | Екскурсії по Львову',
    description: 'Що кажуть наші гості про екскурсії по Львову з Іриною Красіцькою. Реальні відгуки та оцінки від задоволених туристів.',
    url: `${baseUrl}/reviews`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/guide-photo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Відгуки про екскурсії з Іриною Красіцькою',
      },
    ],
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
