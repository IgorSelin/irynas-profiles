import { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Галерея | Екскурсії Львовом з Іриною Красіцькою',
  description: 'Фотографії з наших екскурсій та подорожей. Подивіться на красу Львова та околиць.',
  alternates: {
    canonical: `${baseUrl}/gallery`,
  },
  openGraph: {
    title: 'Галерея | Екскурсії Львовом з Іриною Красіцькою',
    description: 'Фотографії з наших екскурсій та подорожей. Подивіться на красу Львова та околиць.',
    url: `${baseUrl}/gallery`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/guide-photo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Галерея екскурсій з Іриною Красіцькою',
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {' '}
        {/* Add padding for fixed navbar */}
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
