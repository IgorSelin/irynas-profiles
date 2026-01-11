'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { Review } from '@/lib/types';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reviews', {
        cache: 'no-store',
      });
      const data = await response.json();
      console.log('Fetched reviews:', data.reviews?.length || 0);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Відгуки про Ірину Красіцьку</h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Що кажуть наші гості про екскурсії</p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            {isLoading ? (
              <div className="col-span-2 py-12 text-center">
                <p className="text-gray-600">Завантаження відгуків...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => <ReviewCard key={review.id || index} review={review} index={index} />)
            ) : (
              <div className="col-span-2 py-12 text-center">
                <p className="text-gray-600">Поки що немає відгуків. Будьте першим!</p>
              </div>
            )}
          </div>

          <ReviewForm onSuccess={fetchReviews} />
        </div>
      </div>
    </section>
  );
}
