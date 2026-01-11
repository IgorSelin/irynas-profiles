import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TourDetail from '@/components/TourDetail';
import Footer from '@/components/Footer';
import { tours } from '@/lib/tours';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    return {
      title: 'Тур не знайдено',
    };
  }

  return {
    title: `${tour.title} | Ірина Красіцька | Екскурсії по Львову`,
    description: `${tour.description} Авторська екскурсія від Ірини Красіцької.`,
  };
}

export default function TourPage({ params }: { params: { id: string } }) {
  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <TourDetail tour={tour} />
      </div>
      <Footer />
    </main>
  );
}
