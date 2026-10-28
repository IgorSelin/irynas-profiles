'use client';

import { useState } from 'react';
import { PhoneIcon, PHONE, PHONE_LABEL } from './icons';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Як замовити екскурсію з Іриною Красіцькою?',
    answer:
      "Ви можете замовити екскурсію, зв'язавшись зі мною за телефоном +380975383348, через Viber, або написавши на email krasiraira@gmail.com. Також можна заповнити форму на сайті або написати в соціальних мережах (Instagram, Facebook, TikTok).",
  },
  {
    question: 'Скільки коштує екскурсія по Львову?',
    answer:
      'Вартість екскурсій починається від 200 грн/особа для стандартних маршрутів. Ціна залежить від типу екскурсії, тривалості та кількості учасників. Автобусні та виїзні екскурсії коштують від 300 грн. Детальну інформацію про ціни можна знайти на сторінці кожної екскурсії.',
  },
  {
    question: 'Які мови підтримуються під час екскурсій?',
    answer:
      'Я провожу екскурсії українською та польською мовами. Це дозволяє комфортно спілкуватися як з українськими, так і з польськими туристами.',
  },
  {
    question: 'Скільки триває екскурсія?',
    answer:
      'Стандартні піші екскурсії по Львову тривають 2 години. Є також розширені маршрути на 2-3 години, автобусні екскурсії (3-4 години) та виїзні тури (8-14 годин). Тривалість вказана в описі кожної екскурсії.',
  },
  {
    question: 'Чи можна замовити індивідуальну екскурсію?',
    answer:
      'Так, я проводжу як індивідуальні, так і групові екскурсії. Індивідуальні тури дозволяють адаптувати маршрут під ваші інтереси та темп. Вартість індивідуальної екскурсії обговорюється індивідуально.',
  },
  {
    question: 'Які екскурсії найпопулярніші?',
    answer:
      'Найбільше запитів на екскурсії "Середньовічний Львів", "Підземелля Львова", "Вечірній Львів з легендами", "Львів зі смаком кави та шоколаду" та "Золота доба австрійського Львова". Всі ці маршрути дозволяють глибоко зануритися в історію та атмосферу міста.',
  },
  {
    question: 'Чи можна замовити екскурсію для корпоративної групи?',
    answer:
      'Так, я організовую корпоративні екскурсії для компаній та організацій. Можу адаптувати маршрут під специфіку вашої групи та додати додаткові активності. Автобусні екскурсії ідеально підходять для корпоративних груп.',
  },
  {
    question: 'Чи потрібно бронювати екскурсію заздалегідь?',
    answer:
      'Рекомендую бронювати екскурсію заздалегідь, особливо в туристичний сезон (травень-вересень). Мінімальний термін - 1-2 дні наперед. Для виїзних екскурсій та корпоративних груп краще бронювати за тиждень.',
  },
  {
    question: 'Що робити, якщо погана погода?',
    answer:
      'Екскурсії проводяться в будь-яку погоду. Якщо дощ сильний, можна перенести екскурсію на інший час або адаптувати маршрут, включивши більше закритих локацій. У разі необхідності перенесення, ми обговоримо це заздалегідь.',
  },
  {
    question: 'Чи можна змінити маршрут екскурсії?',
    answer:
      'Так, я завжди готова адаптувати маршрут під ваші інтереси. Якщо вас цікавить певна тема або локація, ми можемо включити її в екскурсію. Особливо це актуально для індивідуальних та корпоративних турів.',
  },
  {
    question: 'Чи є екскурсії для дітей?',
    answer:
      'Так, я проводжу спеціальні дитячі та шкільні екскурсії. Є програма "Шлях до Карти поляка" для дітей та підлітків, а також "Історія для ЗНО" для учнів. Всі екскурсії можна адаптувати під вік дітей.',
  },
  {
    question: 'Де починається екскурсія?',
    answer:
      'Місце зустрічі обговорюється індивідуально. Зазвичай це центральні точки міста - площа Ринок, Оперний театр або інша зручна локація. Для автобусних екскурсій можна домовитися про підбір біля вашого готелю.',
  },
  {
    question: 'Чи можна провести екскурсію в вихідні дні?',
    answer:
      'Так, я провожу екскурсії щодня, включаючи вихідні та святкові дні. Графік гнучкий та адаптується під ваші потреби. Просто обговоріть зі мною зручний час при бронюванні.',
  },
  {
    question: 'Що робити, якщо запізнюся на екскурсію?',
    answer:
      "Якщо ви розумієте, що запізнюєтеся, будь ласка, зв'яжіться зі мною заздалегідь. Я завжди намагаюся бути гнучкою та можу трохи зачекати або адаптувати маршрут. У разі серйозної затримки ми можемо перенести екскурсію на інший час.",
  },
  {
    question: 'Чи можна провести екскурсію для великої групи?',
    answer:
      'Так, я працюю з групами різного розміру. Для великих груп (більше 15 осіб) рекомендую автобусні екскурсії або можу розділити групу на кілька частин. Ціна для великих груп обговорюється індивідуально та зазвичай є більш вигідною.',
  },
  {
    question: 'Чи можна провести екскурсію англійською мовою?',
    answer:
      'Наразі я провожу екскурсії українською та польською мовами. Якщо вам потрібна екскурсія англійською, ми можемо обговорити цю можливість індивідуально або я можу порекомендувати колегу, який працює англійською.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section id="faq" className="bg-stone py-24 md:py-32">
        <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-night">
                Часті питання про екскурсії
              </h2>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink/70">
                Відповіді на найпоширеніші питання про екскурсії по Львову. Не знайшли свого — просто подзвоніть.
              </p>
              <a
                href={`tel:${PHONE}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 font-semibold text-white transition-colors hover:bg-azure-800"
              >
                <PhoneIcon className="h-4 w-4" />
                {PHONE_LABEL}
              </a>
            </div>
          </div>

          <div className="border-t border-ink/15 lg:col-span-8">
            {faqData.map((item, index) => {
              const open = openIndex === index;
              return (
                <div key={item.question} className="border-b border-ink/15">
                  <h3>
                    <button
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={open}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="text-lg font-medium text-night transition-colors group-hover:text-azure-700 md:text-xl">
                        {item.question}
                      </span>
                      <span
                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                          open ? 'bg-night text-white' : 'bg-white text-night'
                        }`}
                        aria-hidden="true"
                      >
                        <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                        <span
                          className={`absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-300 ${
                            open ? 'rotate-90 scale-y-0' : ''
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  {/* Answers stay in the HTML when closed; the grid-rows trick animates the height */}
                  <div
                    id={`faq-answer-${index}`}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[65ch] pb-7 pr-14 leading-relaxed text-ink/75">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
