import Reviews from '@/components/Reviews';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Всі відгуки | Ірина Красіцька',
  description: 'Що кажуть наші гості про екскурсії по Львову з Іриною Красіцькою.',
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
