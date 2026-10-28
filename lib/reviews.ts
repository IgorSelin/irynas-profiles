import { collection, DocumentData, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { staticReviews } from '@/lib/staticReviews';
import { Review, ReviewReply } from '@/lib/types';

// Iryna's replies, keyed by review id (Firestore doc id or `static-N`). Only her account may write here (see README).
export const REPLIES_COLLECTION = 'reviewReplies';

export interface ReviewData {
  reviews: Review[];
  replies: Record<string, ReviewReply>;
}

// Runs on the server (API route, pages) and in the browser (admin page): uses the regular Firebase client SDK.
export async function fetchReviewData(): Promise<ReviewData> {
  const [snapshot, replies] = await Promise.all([
    getDocs(query(collection(db, 'reviews'), limit(200))),
    fetchReplies(),
  ]);

  const reviews = snapshot.docs
    .map((doc) => toReview(doc.id, doc.data()))
    .filter((review) => review.approved === undefined || review.approved === true)
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  return { reviews, replies };
}

// Pages pass reviews to client components, so keep only known fields and plain values (no Firestore Timestamp objects).
function toReview(id: string, data: DocumentData): Review {
  return {
    id,
    name: data.name,
    text: data.text,
    rating: data.rating,
    date: typeof data.date?.toDate === 'function' ? data.date.toDate().toISOString() : data.date,
    approved: data.approved,
    tourId: data.tourId,
  };
}

// Replies are an extra: if they can't be read (e.g. Firestore rules not updated yet), still show the reviews.
async function fetchReplies(): Promise<Record<string, ReviewReply>> {
  try {
    const snapshot = await getDocs(collection(db, REPLIES_COLLECTION));
    return Object.fromEntries(
      snapshot.docs.map((doc) => [doc.id, { text: doc.data().text, date: doc.data().date } as ReviewReply]),
    );
  } catch (error) {
    console.error('Error fetching review replies:', error);
    return {};
  }
}

export function withReplies(reviews: Review[], replies: Record<string, ReviewReply>): Review[] {
  return reviews.map((review) => (review.id && replies[review.id] ? { ...review, reply: replies[review.id] } : review));
}

// With `tourId`: reviews of that tour. Without: general reviews from the form plus the static ones.
export function selectReviews({ reviews, replies }: ReviewData, tourId?: string): Review[] {
  const selected = tourId
    ? reviews.filter((review) => review.tourId === tourId).slice(0, 50)
    : [...reviews.filter((review) => !review.tourId).slice(0, 50), ...staticReviews];

  return withReplies(selected, replies);
}
