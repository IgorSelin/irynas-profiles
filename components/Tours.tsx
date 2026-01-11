'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { tours } from '@/lib/tours';

export default function Tours() {
  return (
    <section id="tours" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Доступні екскурсії</h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Оберіть екскурсію, яка вас найбільше цікавить</p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <Link href={`/tours/${tour.id}`} className="block flex-shrink-0">
                <div className="relative h-64">
                  <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                </div>
              </Link>
              <div className="flex flex-grow flex-col p-6">
                <Link href={`/tours/${tour.id}`} className="block">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors hover:text-purple-600">
                    {tour.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">{tour.description}</p>
                </Link>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-purple-600">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  {tour.price && (
                    <div className="flex items-center text-green-600">
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold">{tour.price}</span>
                    </div>
                  )}
                  {tour.languages && tour.languages.length > 0 && (
                    <div className="flex items-center text-blue-600">
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      <span className="text-sm font-semibold">{tour.languages.join(' / ')}</span>
                    </div>
                  )}
                </div>
                {tour.highlights && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">Що ви побачите:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                      {tour.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-auto flex gap-3 px-6 pb-6">
                <Link
                  href={`/tours/${tour.id}`}
                  className="flex flex-1 items-center justify-center rounded-lg bg-purple-600 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  Детальніше
                </Link>
                <a
                  href="tel:+380975383348"
                  className="flex flex-1 items-center justify-center rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Замовити
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
