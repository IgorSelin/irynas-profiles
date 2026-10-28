import { Metadata } from 'next';
import ReviewsAdmin from '@/components/ReviewsAdmin';
import { getTours } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Відповіді на відгуки',
  robots: { index: false, follow: false },
};

export default async function ReviewsAdminPage() {
  const tours = await getTours();
  const tourTitles = Object.fromEntries(tours.map((tour) => [tour.id, tour.title]));

  return <ReviewsAdmin tourTitles={tourTitles} />;
}
