'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ImageWithSkeleton from './ImageWithSkeleton';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';
import { tours } from '@/lib/tours';
import { Tour } from '@/lib/types';

function TourCard({
  tour,
  index,
  setSelectedTag,
  selectedTag,
}: {
  tour: Tour;
  index: number;
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
    >
      <Link href={`/tours/${tour.slug}`} target="_blank" className="block flex-shrink-0">
        <div className="relative h-64">
          <ImageWithSkeleton
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {tour.tags && (
            <div
              className={`absolute left-4 top-4 flex flex-wrap gap-2 transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {tour.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-grow flex-col p-6">
        <Link href={`/tours/${tour.slug}`} target="_blank" className="block">
          <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors hover:text-purple-600">
            {tour.title}
          </h3>
          <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">{tour.description}</p>
        </Link>
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-purple-600">
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">{tour.duration}</span>
          </div>
          {tour.price && (
            <div className="flex items-center text-green-600">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">{tour.price}</span>
            </div>
          )}
          {tour.type && (
            <div className="flex items-center text-green-600">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-semibold">
                {tour.type === 'both'
                  ? 'Індивідуальні та корпоративні'
                  : tour.type === 'corporate'
                    ? 'Для корпоративних груп'
                    : 'Індивідуальні'}
              </span>
            </div>
          )}
          {tour.languages && tour.languages.length > 0 && (
            <div className="flex items-center text-blue-600">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span className="text-sm font-semibold">{tour.languages.join(' / ')}</span>
            </div>
          )}
        </div>
        {tour.tags && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tour.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  tag === selectedTag ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto flex gap-3 px-6 pb-6">
        <Link
          href={`/tours/${tour.slug}`}
          target="_blank"
          className="flex flex-1 items-center justify-center rounded-lg bg-purple-600 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Детальніше
        </Link>
        <a
          href="tel:+380975383348"
          className="flex flex-1 items-center justify-center rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Замовити
        </a>
      </div>
    </motion.div>
  );
}

export default function Tours() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tours.forEach((tour) => {
      tour.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.highlights?.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tour.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || tour.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section id="tours" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Доступні екскурсії</h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Оберіть екскурсію, яка вас найбільше цікавить</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mx-auto mb-12 max-w-4xl">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Пошук екскурсії за назвою, описом або тегом..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-purple-100 bg-white px-6 py-4 pl-14 text-lg text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10"
            />
            <svg
              className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-4 md:flex-wrap md:justify-center md:pb-0">
            <button
              onClick={() => setSelectedTag(null)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all ${
                !selectedTag
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-600 shadow-sm hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              Всі екскурсії
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  tag === selectedTag
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                    : 'bg-white text-gray-600 shadow-sm hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={index}
                setSelectedTag={setSelectedTag}
                selectedTag={selectedTag}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTours.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xl text-gray-500">За вашим запитом нічого не знайдено</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="mt-4 font-bold text-purple-600 hover:underline"
            >
              Скинути всі фільтри
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
