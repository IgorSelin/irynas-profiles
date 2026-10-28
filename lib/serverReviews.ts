import { unstable_cache } from 'next/cache';
import { fetchReviewData, selectReviews } from '@/lib/reviews';

export const REVIEWS_CACHE_TAG = 'reviews';

// All pages share one Firestore read per hour instead of reading on every page regeneration.
const getCachedReviewData = unstable_cache(fetchReviewData, ['review-data'], {
  revalidate: 3600,
  tags: [REVIEWS_CACHE_TAG],
});

// Server-rendered so crawlers get reviews and Iryna's replies in the HTML; browsers then refresh them via /api/reviews.
export async function getReviews(tourId?: string) {
  try {
    return selectReviews(await getCachedReviewData(), tourId);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return selectReviews({ reviews: [], replies: {} }, tourId);
  }
}
