'use client';

import { useEffect, useState } from 'react';

// Sticky table of contents for WhyChoose: highlights the reason currently crossing the middle of the screen
export default function ReasonsIndex({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Чому обирають мене" className="border-t border-ink/10">
      <ol>
        {items.map(({ id, title }, i) => {
          const isActive = id === active;
          return (
            <li key={id} className="border-b border-ink/10">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex items-baseline gap-4 py-3.5 transition-colors ${
                  isActive ? 'text-night' : 'text-ink/65 hover:text-night'
                }`}
              >
                <span
                  className={`font-display text-xs font-semibold tabular-nums transition-colors ${
                    isActive ? 'text-gold-700' : ''
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] font-medium leading-snug">{title}</span>
                <span
                  aria-hidden
                  className={`ml-auto h-1.5 w-1.5 shrink-0 self-center rounded-full bg-gold-400 transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
