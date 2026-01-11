import Gallery from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Галерея | Екскурсії Львовом з Іриною Красіцькою',
  description: 'Фотографії з наших екскурсій та подорожей. Подивіться на красу Львова та околиць.',
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
