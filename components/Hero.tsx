'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Екскурсії по Львову з Іриною Красіцькою',
    description: 'Професійний екскурсовод у Львові Ірина Красіцька. Авторські екскурсії по історичному центру Львова.',
    thumbnailUrl: `${baseUrl}/images/guide-photo.webp`,
    uploadDate: '2026-01-11',
    contentUrl: `${baseUrl}/videos/hero-video.mp4`,
    embedUrl: `${baseUrl}`,
    duration: 'PT30S',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema),
        }}
      />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 pt-16 md:pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/40" />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          >
            <source src="/videos/lviv_opernyy.webm" type="video/webm" />
          </video>
        </div>

        {/* Content */}
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-6 py-2 text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
              Не стандартна екскурсія, а розуміння міста
            </span>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-8xl">
              Екскурсії з <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Іриною Красіцькою
              </span>
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-white/95 md:text-3xl">Професійний екскурсовод у Львові</h2>
            <p className="mx-auto mb-10 max-w-3xl text-xl font-medium leading-relaxed text-white/90 md:text-2xl">
              Я показую Львів через деталі, які більшість не помічає, і пояснюю їхній сенс простою мовою.{' '}
              <br className="hidden md:block" />
              Історія без сухих дат — через людей і сенси. Після моїх екскурсій місто запам’ятовується.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <motion.a
                href="#tours"
                className="inline-block rounded-2xl bg-white px-10 py-5 text-lg font-bold text-purple-900 shadow-xl transition-all hover:bg-purple-50"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Обрати екскурсію
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>
    </>
  );
}
