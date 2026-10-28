'use client';

import { useRef } from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

const facts = [
  { value: '10+', label: 'років проводжу екскурсії' },
  { value: '1000+', label: 'гостей з різних країн' },
  { value: '25+', label: 'авторських маршрутів' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-about-photo]',
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: '[data-about-frame]', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="bg-white py-24 md:py-32">
      <div className="container mx-auto grid gap-14 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div data-about-frame className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone">
            <div data-about-photo className="absolute -inset-y-[10%] inset-x-0">
              <ImageWithSkeleton
                src="/images/guide-photo.webp"
                alt="Ірина Красіцька - професійний екскурсовод у Львові"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-7 lg:pt-6">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-night">
            Про Ірину Красіцьку
          </h2>
          <p className="mt-8 max-w-2xl text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-snug text-ink">
            Екскурсія — це не набір дат і прізвищ, а глибоке розуміння міста. Після нашої зустрічі Львів залишиться у
            вашій пам’яті не декорацією, а живою історією.
          </p>

          <div className="mt-10 grid max-w-2xl gap-6 text-[17px] leading-relaxed text-ink/75">
            <div>
              <h3 className="mb-1 font-semibold text-ink">Історія через сенси та людей</h3>
              <h4 className="mb-3 text-ink/60">Авторський підхід до екскурсій по Львову</h4>
              <p>
                Я показую Львів через деталі, які більшість не помічає, і пояснюю їхній сенс простою мовою. Символи на
                фасадах, історії мешканців кам’яниць, причини, чому місто стало саме таким.
              </p>
            </div>
            <p>
              Моя мета — створити досвід, який дозволяє відчути душу міста. Тому кожен маршрут я готую сама: з архівів,
              досліджень істориків і власних спостережень.
            </p>
          </div>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 lg:mt-14">
            {facts.map((fact) => (
              <div key={fact.value} className="flex flex-col">
                <dt className="mt-1 text-sm leading-snug text-ink/60 md:text-base">{fact.label}</dt>
                <dd className="order-first font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-tight text-azure-700">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
