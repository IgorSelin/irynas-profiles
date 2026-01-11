'use client';

import { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
      </div>
      <div className="mb-3 flex items-center">{renderStars(review.rating)}</div>
      <p className="leading-relaxed text-gray-700">{review.text}</p>
    </div>
  );
}
