'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { Review } from '@/lib/types';
import { StarIcon } from './icons';

interface ReviewsProps {
  // Server-rendered list (may be up to an hour old); refreshed from the API after mount
  initialReviews: Review[];
  limit?: number;
}

export default function Reviews({ initialReviews, limit }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews', {
        cache: 'no-store',
      });
      if (!response.ok) return;
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  const totalReviews = reviews.length;
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + (review.rating || 5), 0) / reviews.length : 5;

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Ірина Красіцька - Екскурсовод у Львові',
    },
    ratingValue: averageRating.toFixed(1),
    reviewCount: totalReviews,
    bestRating: '5',
    worstRating: '1',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />
      <section id="reviews" className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-night">
                Відгуки про Ірину Красіцьку
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">Що кажуть гості про екскурсії</p>
            </div>
            {totalReviews > 0 && (
              <div className="flex items-center gap-5 lg:col-span-4 lg:justify-end">
                <span className="font-display text-6xl font-semibold tracking-tight text-night">
                  {averageRating.toFixed(1)}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="flex gap-0.5 text-gold-500" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5" />
                    ))}
                  </span>
                  <span className="text-ink/60">середня оцінка, відгуків: {totalReviews}</span>
                </span>
              </div>
            )}
          </div>

          {displayedReviews.length > 0 ? (
            <div className="gap-6 md:columns-2 lg:columns-3">
              {displayedReviews.map((review, index) => (
                <ReviewCard key={review.id || index} review={review} index={index} />
              ))}
            </div>
          ) : (
            <p className="rounded-[22px] bg-stone px-6 py-12 text-center text-ink/70">
              Відгуків ще немає. Залиште перший — форма нижче.
            </p>
          )}

          {limit && reviews.length > limit && (
            <div className="mt-8 flex justify-center">
              <Link
                href="/reviews"
                className="rounded-full border border-night px-8 py-4 font-semibold text-night transition-colors hover:bg-night hover:text-white"
              >
                Читати всі відгуки ({reviews.length})
              </Link>
            </div>
          )}

          <div className="mt-20 grid gap-10 rounded-[32px] bg-night p-4 text-white sm:p-6 lg:grid-cols-12 lg:gap-6 lg:p-6">
            <div className="flex flex-col p-4 sm:p-6 lg:col-span-5">
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight tracking-tight">
                Були на екскурсії? Розкажіть, як усе пройшло
              </h3>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                Відгук з’явиться на сайті одразу. А оцінка на Google Maps допомагає іншим мандрівникам знайти екскурсії.
              </p>
              <a
                href="https://maps.app.goo.gl/oSuowDpaQ7k4WGm67"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 font-semibold text-night transition-colors hover:bg-gold-300 lg:mt-auto"
              >
                Оцінити на Google Maps
              </a>
            </div>
            <div className="lg:col-span-7">
              <ReviewForm onSuccess={fetchReviews} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
