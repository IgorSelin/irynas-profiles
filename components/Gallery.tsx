'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ImageWithSkeleton from './ImageWithSkeleton';

const staticPhotos = [
  { id: 1, src: '/images/tour-opera.webp', alt: 'Оперний театр', category: 'Львів' },
  { id: 2, src: '/images/tour-lychakiv.webp', alt: 'Личаківський цвинтар', category: 'Львів' },
  { id: 3, src: '/images/tour-medieval.webp', alt: 'Середньовічний Львів', category: 'Львів' },
  { id: 4, src: '/images/tour-underground.webp', alt: 'Підземелля Львова', category: 'Львів' },
  { id: 5, src: '/images/tour-austrian.webp', alt: 'Австрійський Львів', category: 'Львів' },
  { id: 6, src: '/images/tour-bus.webp', alt: 'Автобусна екскурсія', category: 'Львів' },
  { id: 7, src: '/images/additional-shevchenkivskyi-hai.webp', alt: 'Шевченківський гай', category: 'Львів' },
  { id: 8, src: '/images/additional-tustan.webp', alt: 'Тустань', category: 'Карпати' },
  { id: 9, src: '/images/additional-waterfall.webp', alt: "Водоспад Кам'янка", category: 'Карпати' },
  { id: 10, src: '/images/additional-ternopil-castles.webp', alt: 'Замки Тернопілля', category: 'Замки' },
  { id: 11, src: '/images/additional-golden-horseshoe.webp', alt: 'Золота підкова', category: 'Замки' },
  { id: 13, src: '/images/additional-poland-lancut.webp', alt: 'Ланьцут', category: 'Польща' },
  { id: 14, src: '/images/additional-poland-krasiczyn.webp', alt: 'Красічин', category: 'Польща' },
  { id: 15, src: '/images/additional-poland-solina.webp', alt: 'Соліна', category: 'Польща' },
  { id: 16, src: '/images/tour-stryiskyi.webp', alt: 'Стрийський парк', category: 'Львів' },
  { id: 17, src: '/images/vechirniy-lviv.webp', alt: 'Вечірній Львів', category: 'Львів' },
  { id: 18, src: '/images/tour-coffee.webp', alt: 'Кава та шоколад', category: 'Львів' },
  { id: 19, src: '/images/tour-beer.webp', alt: 'Пивний Львів', category: 'Львів' },
  { id: 20, src: '/images/tour-synevyr.webp', alt: 'Синевир та Шипіт', category: 'Карпати' },
  { id: 21, src: '/images/kaplytsia_boimiv.webp', alt: 'Біблійний Львів', category: 'Львів' },
  { id: 22, src: '/images/tour-legends.webp', alt: 'Легенди Львова', category: 'Львів' },
  { id: 23, src: '/images/karta-polaka.webp', alt: 'Для дітей', category: 'Львів' },
  { id: 24, src: '/images/tour-zno.webp', alt: 'Підготовка до ЗНО', category: 'Львів' },
  { id: 25, src: '/images/tour-professors.webp', alt: 'Розстріл професорів', category: 'Львів' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [filter, setFilter] = useState('Всі');
  const [photos, setPhotos] = useState(staticPhotos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGooglePhotos() {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const data = await response.json();
          if (data.photos && data.photos.length > 0) {
            setPhotos((prev) => [...prev, ...data.photos]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Google photos:', error);
      }
    }

    fetchGooglePhotos();
  }, []);

  const categories = ['Всі', ...new Set(photos.map((p) => p.category))];

  const filteredPhotos = filter === 'Всі' ? photos : photos.filter((p) => p.category === filter);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Галерея екскурсій по Львову',
    description: 'Фотографії з екскурсій по Львову з Іриною Красіцькою',
    image: photos.map((photo) => ({
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${photo.src}`,
      description: photo.alt,
      name: photo.alt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageSchema),
        }}
      />
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Галерея подорожей</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Яскраві моменти з наших екскурсій та подорожей. Приєднуйтесь до нас!
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  filter === cat ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-50'
                }`}
              >
                {cat}
              </button>
            ))}
            <a
              href="https://maps.app.goo.gl/Z7JtYM7AdYAdSPKJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full border border-purple-600 bg-white px-6 py-2 text-purple-600 transition-all duration-300 hover:bg-purple-50"
            >
              <span>Всі фото на Google Maps</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </a>
          </div>

          {/* Photo Grid */}
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-md"
                  onClick={() => setSelectedImage(photo)}
                >
                  <ImageWithSkeleton
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="px-4 text-center font-medium text-white">{photo.alt}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute right-6 top-6 text-4xl text-white transition-colors hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative aspect-[4/3] w-full max-w-5xl md:aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ImageWithSkeleton src={selectedImage.src} alt={selectedImage.alt} fill className="object-contain" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{selectedImage.alt}</h3>
                    <p className="text-gray-300">{selectedImage.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
