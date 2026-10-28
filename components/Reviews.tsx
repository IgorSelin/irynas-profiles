'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { Review } from '@/lib/types';

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
      <section id="reviews" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Відгуки про Ірину Красіцьку</h2>
            <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">Що кажуть наші гості про екскурсії</p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              {displayedReviews.length > 0 ? (
                displayedReviews.map((review, index) => (
                  <ReviewCard key={review.id || index} review={review} index={index} />
                ))
              ) : (
                <div className="col-span-2 py-12 text-center">
                  <p className="text-gray-600">Поки що немає відгуків. Будьте першим!</p>
                </div>
              )}
            </div>

            {limit && reviews.length > limit && (
              <div className="mb-16 text-center">
                <Link
                  href="/reviews"
                  className="inline-block rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  Переглянути всі відгуки
                </Link>
              </div>
            )}

            <ReviewForm onSuccess={fetchReviews} />
          </div>
        </div>
      </section>
    </>
  );
}
