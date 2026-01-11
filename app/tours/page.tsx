import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Tours from '@/components/Tours';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Екскурсії по Львову з Іриною Красіцькою | Доступні тури та маршрути',
  description:
    'Ознайомтесь з авторськими екскурсіями по Львову від Ірини Красіцької. Історичний центр, легенди, кавовий Львів та архітектурні перлини.',
  keywords:
    'Ірина Красіцька, авторські екскурсії Львів, тури Львів, маршрути Львів, історичний центр Львова, кавовий Львів',
};

export default function ToursPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <Tours />
      </div>
      <Footer />
    </main>
  );
}
