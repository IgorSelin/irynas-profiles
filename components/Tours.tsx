'use client';

import ImageWithSkeleton from './ImageWithSkeleton';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Tour } from '@/lib/types';
import { ClockIcon, PhoneIcon, PHONE } from './icons';

const typeLabels: Record<NonNullable<Tour['type']>, string> = {
  both: 'Індивідуальні та корпоративні',
  corporate: 'Для корпоративних груп',
  individual: 'Індивідуальні',
};

const TOP_TAGS = 10;

// Some tours store a bare number as the price; the rest are written out in full
const formatPrice = (price: string) => (/^\d+$/.test(price.trim()) ? `${price.trim()} грн` : price);

function TourCard({ tour, hidden }: { tour: Tour; hidden: boolean }) {
  return (
    <article className={`group flex flex-col ${hidden ? 'hidden' : ''}`}>
      <Link
        href={`/tours/${tour.slug}`}
        target="_blank"
        className="relative block aspect-[4/3] overflow-hidden rounded-[22px] bg-stone"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ImageWithSkeleton
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {tour.tags && tour.tags.length > 0 && (
          <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
            {tour.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-night backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 text-ink/60">
            <ClockIcon />
            {tour.duration}
          </span>
          {tour.price && <span className="font-semibold text-azure-700">{formatPrice(tour.price)}</span>}
        </div>

        <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-night">
          <Link href={`/tours/${tour.slug}`} target="_blank" className="transition-colors hover:text-azure-700">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 leading-relaxed text-ink/65">{tour.description}</p>

        {(tour.type || (tour.languages && tour.languages.length > 0)) && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
            {tour.type && <span className="rounded-full border border-ink/10 px-3 py-1">{typeLabels[tour.type]}</span>}
            {tour.languages && tour.languages.length > 0 && (
              <span className="rounded-full border border-ink/10 px-3 py-1">{tour.languages.join(' / ')}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-6">
          <Link
            href={`/tours/${tour.slug}`}
            target="_blank"
            className="flex flex-1 items-center justify-center rounded-full bg-night py-3 font-semibold text-white transition-colors hover:bg-azure-800"
          >
            Детальніше
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 font-semibold text-night transition-colors hover:border-night"
          >
            <PhoneIcon className="h-4 w-4" />
            Замовити
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Tours({ tours, initialCount }: { tours: Tour[]; initialCount?: number }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const [showAllTags, setShowAllTags] = useState(false);

  // Most-used topics first, so the short list shows the ones that filter something meaningful
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    tours.forEach((tour) => {
      tour.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    });
    return Array.from(counts.keys()).sort((a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b, 'uk'));
  }, [tours]);
  const visibleTags = showAllTags ? allTags : allTags.filter((tag, i) => i < TOP_TAGS || tag === selectedTag);

  const filteredTours = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query) ||
        tour.highlights?.some((h) => h.toLowerCase().includes(query)) ||
        tour.tags?.some((t) => t.toLowerCase().includes(query));

      const matchesTag = !selectedTag || tour.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [tours, searchQuery, selectedTag]);

  // Collapsed cards stay in the HTML (just hidden) so crawlers still see links to every tour
  const filtering = searchQuery !== '' || selectedTag !== null;
  const collapsed = !!initialCount && !expanded && !filtering && filteredTours.length > initialCount;

  const chipClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-night text-white' : 'bg-stone text-ink/75 hover:bg-azure-100 hover:text-night'
    }`;

  return (
    <section id="tours" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-night">
              Доступні екскурсії
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Оберіть екскурсію, яка вас найбільше цікавить: від прогулянок історичним центром до виїздів у замки,
              Карпати та Польщу.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <label htmlFor="tour-search" className="sr-only">
              Пошук екскурсії
            </label>
            <input
              id="tour-search"
              type="search"
              placeholder="Пошук за назвою, описом або темою"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-transparent bg-stone py-4 pl-12 pr-12 text-base text-ink transition-colors placeholder:text-ink/45 focus:border-azure-400 focus:bg-white focus:outline-none"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 hover:bg-white hover:text-night"
                aria-label="Очистити пошук"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="scrollbar-hide -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          <button onClick={() => setSelectedTag(null)} className={chipClass(!selectedTag)}>
            Всі екскурсії
          </button>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={chipClass(tag === selectedTag)}
              aria-pressed={tag === selectedTag}
            >
              {tag}
            </button>
          ))}
          {allTags.length > TOP_TAGS && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-azure-700 underline-offset-4 hover:underline"
              aria-expanded={showAllTags}
            >
              {showAllTags ? 'Згорнути теми' : `Усі теми (${allTags.length})`}
            </button>
          )}
        </div>

        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
          <h3 className="font-medium text-night">Популярні екскурсії по Львову</h3>
          <span className="text-sm text-ink/50">Знайдено: {filteredTours.length}</span>
        </div>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} hidden={collapsed && index >= initialCount!} />
          ))}
        </div>

        {collapsed && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="rounded-full border border-night px-8 py-4 font-semibold text-night transition-colors hover:bg-night hover:text-white"
            >
              Показати всі екскурсії ({filteredTours.length})
            </button>
          </div>
        )}

        {filteredTours.length === 0 && (
          <div className="rounded-[28px] bg-stone px-6 py-16 text-center">
            <p className="text-xl font-medium text-night">За запитом «{searchQuery || selectedTag}» екскурсій немає</p>
            <p className="mt-2 text-ink/60">Спробуйте інше слово або подивіться всі маршрути.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="mt-6 rounded-full bg-night px-6 py-3 font-semibold text-white hover:bg-azure-800"
            >
              Показати всі екскурсії
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
