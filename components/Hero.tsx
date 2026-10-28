'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { PhoneIcon, PHONE } from './icons';

export default function Hero() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';
  const sectionRef = useRef<HTMLElement>(null);

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Екскурсії по Львову з Іриною Красіцькою',
    description: 'Професійний екскурсовод у Львові Ірина Красіцька. Авторські екскурсії по історичному центру Львова.',
    thumbnailUrl: `${baseUrl}/images/guide-photo.webp`,
    uploadDate: '2026-01-11',
    contentUrl: `${baseUrl}/videos/hero-video.mp4`,
    embedUrl: `${baseUrl}`,
    duration: 'PT30S',
  };

  // The entrance plays in CSS so the headline is never hidden waiting for JS; GSAP only adds the scroll depth
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to('[data-hero-video]', {
          yPercent: 14,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('[data-hero-copy]', {
          y: -60,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema),
        }}
      />
      <section
        ref={sectionRef}
        data-nav-dark
        className="flex min-h-[100svh] flex-col bg-night px-2 pb-2 pt-16 md:px-4 md:pb-4 md:pt-20"
      >
        <div className="relative flex flex-1 animate-lens-open flex-col overflow-hidden rounded-[28px] bg-azure-900">
          <video
            data-hero-video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full origin-top object-cover"
          >
            <source src="/videos/lviv_opernyy.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/10" />

          <div
            data-hero-copy
            className="relative z-10 mt-auto grid gap-10 p-6 pt-32 text-white sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-12 lg:p-14"
          >
            <h1 className="font-semibold leading-[0.98] tracking-[-0.035em] [font-size:clamp(2.6rem,7.4vw,7rem)] lg:col-span-8">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-line-up [animation-delay:350ms]">Екскурсії з</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-line-up [animation-delay:470ms]">Іриною Красіцькою</span>
              </span>
            </h1>

            <div className="animate-fade-in [animation-delay:800ms] lg:col-span-4 lg:pb-3">
              <h2 className="mb-4 text-lg font-medium text-gold-300 md:text-xl">Професійний екскурсовод у Львові</h2>
              <p className="mb-8 max-w-md text-[17px] leading-relaxed text-white/80">
                <strong className="font-semibold text-white">Не стандартна екскурсія, а розуміння міста.</strong> Я
                показую Львів через деталі, які більшість не помічає, і пояснюю їхній сенс простою мовою. Історія без
                сухих дат — через людей і сенси.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#tours"
                  className="inline-flex items-center rounded-full bg-gold-400 px-7 py-4 text-base font-semibold text-night transition-colors hover:bg-gold-300"
                >
                  Обрати екскурсію
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Подзвонити
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
