'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 pt-16 md:pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">Вітаю у Львові!</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
            Професійні екскурсії по найкрасивішому місту України
          </p>
          <motion.a
            href="#tours"
            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-900 shadow-lg transition-colors hover:bg-purple-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Переглянути екскурсії
          </motion.a>
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
  );
}
