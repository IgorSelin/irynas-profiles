import { Review } from '@/lib/types';
import { Monogram, StarIcon } from './icons';

interface ReviewCardProps {
  review: Review;
  index: number;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <figure className="mb-6 break-inside-avoid rounded-[22px] bg-stone p-6 sm:p-7">
      <div className="mb-4 flex gap-0.5" role="img" aria-label={`Оцінка ${review.rating} з 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-gold-500' : 'text-ink/15'}`} />
        ))}
      </div>
      <blockquote className="whitespace-pre-line leading-relaxed text-ink/85">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-night font-display text-sm font-medium text-white"
          aria-hidden="true"
        >
          {review.name.trim().charAt(0).toUpperCase()}
        </span>
        <span className="flex flex-col">
          <span className="font-semibold text-night">{review.name}</span>
          <span className="text-sm text-ink/50">{formatDate(review.date)}</span>
        </span>
      </figcaption>
      {review.reply && (
        <div className="mt-6 rounded-2xl bg-white p-5">
          <div className="mb-3 flex items-center gap-3">
            <Monogram className="h-8 w-8 text-[11px]" />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-night">Відповідь Ірини Красіцької</span>
              <span className="text-xs text-ink/50">{formatDate(review.reply.date)}</span>
            </span>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-ink/75">{review.reply.text}</p>
        </div>
      )}
    </figure>
  );
}
