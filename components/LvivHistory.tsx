'use client';

import { useEffect, useRef } from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const eras = [
  {
    mark: '1256',
    title: 'Заснування та середньовіччя',
    image: '/images/tour-medieval.webp',
    imageAlt: 'Середньовічний Львів',
    paragraphs: [
      'Львів був заснований у 1256 році князем Данилом Галицьким і названий на честь його сина Лева. Місто швидко стало важливим торговельним центром на перехресті шляхів між Сходом і Заходом. У XIV столітті Львів увійшов до складу Польського королівства, що сприяло його розвитку та збагаченню. Саме в цей період сформувався унікальний архітектурний ансамбль історичного центру, який сьогодні внесений до списку Всесвітньої спадщини ЮНЕСКО.',
      "Середньовічний Львів був багатонаціональним містом, де жили українці, поляки, вірмени, євреї, німці та інші народи. Кожна громада мала свій квартал, свою архітектуру та традиції. Це створило неповторну культурну мозаїку, яку можна побачити в архітектурі, назвах вулиць та традиціях міста. Площа Ринок, яка є серцем старого міста, зберігає атмосферу того часу з її унікальними кам'яницями, кожна з яких має свою історію.",
    ],
  },
  {
    mark: '1772',
    title: 'Австрійський період — золота доба',
    image: '/images/tour-austrian.webp',
    imageAlt: 'Австрійський Львів',
    paragraphs: [
      'Після поділів Речі Посполитої у 1772 році Львів увійшов до складу Австрійської імперії, що стало початком нового етапу в історії міста. Австрійський період (1772-1918) називають "золотою добою" Львова. Саме тоді місто пережило неймовірний розквіт: були побудовані величні будівлі, створені парки, прокладені нові вулиці. Львів став одним з найкрасивіших міст імперії, його називали "маленьким Віднем".',
      'У цей період були зведені такі перлини архітектури, як Оперний театр, Галицька каса, Палац Потоцьких, проспект Свободи. Місто отримало сучасну інфраструктуру: електричне освітлення, трамваї, водопровід. Львів став важливим культурним та освітнім центром, тут працювали університети, театри, музеї. Австрійський період залишив глибокий слід в архітектурі та культурі міста, який видно і сьогодні.',
    ],
  },
  {
    mark: 'XXI',
    title: 'Сучасний Львів',
    image: '/images/vechirniy-lviv.webp',
    imageAlt: 'Вечірній Львів',
    paragraphs: [
      'Сьогодні Львів — це сучасне європейське місто, яке зберігає свою унікальну історичну спадщину. Місто поєднує багатовікову історію з сучасними тенденціями в архітектурі, культурі та житті. Львів став одним з найпопулярніших туристичних центрів України, приваблюючи мільйони відвідувачів щороку своєю красою, атмосферою та культурною спадщиною.',
      'Історичний центр Львова внесений до списку Всесвітньої спадщини ЮНЕСКО, що підтверджує його унікальну цінність. Місто живе активним культурним життям: фестивалі, виставки, концерти, театральні постановки. Львів також відомий своєю кавовою культурою, ресторанною сценою та творчою атмосферою. Це місто, де історія зустрічається з сучасністю, створюючи неповторну атмосферу, яку варто відчути на власні очі.',
    ],
  },
];

// Wide screens with motion allowed get a pinned horizontal walk through the eras; everyone else reads a column
const HORIZONTAL = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

export default function LvivHistory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(HORIZONTAL, () => {
        const track = trackRef.current!;
        // offsetWidth ignores the marks sliding in from the right, which would otherwise pad the end of the walk
        const distance = () => track.offsetWidth - window.innerWidth;
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        };

        const walk = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { ...scrollTrigger, pin: true, scrub: 0.8 },
        });
        gsap.fromTo(
          '[data-history-progress]',
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { ...scrollTrigger, scrub: 0.8 } },
        );

        gsap.utils.toArray<HTMLElement>('[data-era]').forEach((era) => {
          gsap.from(era.querySelector('[data-era-mark]'), {
            xPercent: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: era,
              containerAnimation: walk,
              start: 'left right',
              end: 'center center',
              scrub: true,
            },
          });
          gsap.from(era.querySelector('[data-era-image]'), {
            scale: 1.25,
            ease: 'none',
            scrollTrigger: {
              trigger: era,
              containerAnimation: walk,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  // Content above (tour filters, "show all", late images) changes the page height, which moves the pin
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="lviv-history" data-nav-dark className="relative overflow-hidden bg-night text-white">
      <div ref={trackRef} className="history-track flex flex-col">
        <div className="history-intro flex shrink-0 flex-col justify-center px-4 pb-6 pt-24 md:px-6">
          <h2 className="max-w-xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-semibold leading-[1.02]">
            Львів — місто з історією
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            Відкрийте багатовікову історію одного з найкрасивіших міст України: від княжого граду до міста, яке називали
            маленьким Віднем.
          </p>
        </div>

        {eras.map((era) => (
          <article
            key={era.mark}
            data-era
            className="history-era grid shrink-0 gap-10 border-t border-white/10 px-4 py-16 md:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-azure-900 lg:aspect-auto lg:h-[64svh]">
              <div data-era-image className="absolute inset-0">
                <ImageWithSkeleton
                  src={era.image}
                  alt={era.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <div
                data-era-mark
                className="font-display text-[clamp(4rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-tight text-gold-400"
                aria-hidden="true"
              >
                {era.mark}
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-tight tracking-tight text-white">
                {era.title}
              </h3>
              <div className="history-era-text mt-6 grid max-w-[60ch] gap-4 leading-relaxed text-white/75">
                {era.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="history-progress pointer-events-none absolute inset-x-16 bottom-10 hidden h-px bg-white/15">
        <div data-history-progress className="h-full origin-left scale-x-0 bg-gold-400" />
      </div>
    </section>
  );
}
