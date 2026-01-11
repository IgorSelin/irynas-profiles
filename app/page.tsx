import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});
const Tours = dynamic(() => import('@/components/Tours'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Tours />
      <Reviews limit={10} />
      <Contact />
      <Footer />
    </main>
  );
}
