import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});
const Tours = dynamic(() => import('@/components/Tours'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});
const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
});
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Tours />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
