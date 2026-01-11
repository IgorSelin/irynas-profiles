import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Tours from '@/components/Tours';
import AdditionalServices from '@/components/AdditionalServices';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Tours />
      <AdditionalServices />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
