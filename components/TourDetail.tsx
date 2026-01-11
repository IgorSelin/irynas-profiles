'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/lib/types';
import { useEffect, useState, useCallback } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { Review } from '@/lib/types';

interface TourDetailProps {
  tour: Tour;
}

export default function TourDetail({ tour }: TourDetailProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reviews?tourId=${tour.id}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      console.log(`Fetched reviews for tour ${tour.id}:`, data.reviews?.length || 0);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tour.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/tours"
            className="inline-flex items-center font-semibold text-purple-600 transition-colors hover:text-purple-700"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад до всіх екскурсій
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="relative h-96 md:h-[500px]">
            <Image src={tour.image} alt={tour.title} fill className="object-cover" priority />
          </div>
          <div className="p-8 md:p-12">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">{tour.title}</h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-700">{tour.description}</p>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="flex items-center text-purple-600">
                <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-600">Тривалість</p>
                  <p className="text-lg font-semibold">{tour.duration}</p>
                </div>
              </div>
              {tour.price && (
                <div className="flex items-center text-green-600">
                  <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Ціна</p>
                    <p className="text-lg font-semibold">{tour.price}</p>
                  </div>
                </div>
              )}
              {tour.languages && tour.languages.length > 0 && (
                <div className="flex items-center text-blue-600">
                  <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Мови</p>
                    <p className="text-lg font-semibold">{tour.languages?.join(' / ')}</p>
                  </div>
                </div>
              )}
              {tour.type && (
                <div className="flex items-center text-indigo-600">
                  <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Тип групи</p>
                    <p className="text-lg font-semibold">
                      {tour.type === 'both'
                        ? 'Індивідуальна / Корпоративна'
                        : tour.type === 'corporate'
                          ? 'Корпоративна'
                          : 'Індивідуальна'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {tour.highlights && tour.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Що ви побачите:</h3>
                <ul className="grid gap-3 md:grid-cols-2">
                  {tour.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-lg text-gray-700">
                      <svg
                        className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href="tel:+380975383348"
              className="inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-purple-700 md:w-auto"
            >
              <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Замовити екскурсію
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Відгуки про цю екскурсію</h2>
            <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
            {reviews.length > 0 && (
              <p className="text-lg text-gray-600">
                {reviews.length} {reviews.length === 1 ? 'відгук' : reviews.length < 5 ? 'відгуки' : 'відгуків'}
              </p>
            )}
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2">
            {isLoading ? (
              <div className="col-span-2 py-12 text-center">
                <p className="text-gray-600">Завантаження відгуків...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => <ReviewCard key={review.id || index} review={review} index={index} />)
            ) : (
              <div className="col-span-2 py-12 text-center">
                <p className="text-gray-600">Поки що немає відгуків про цю екскурсію. Будьте першим!</p>
              </div>
            )}
          </div>

          <ReviewForm onSuccess={fetchReviews} tourId={tour.id} />
        </motion.div>
      </div>
    </section>
  );
}
