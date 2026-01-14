'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <section id="faq" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Часті питання про екскурсії</h2>
            <div className="mx-auto h-1 w-24 bg-purple-600"></div>
            <p className="mt-4 text-lg text-gray-600">Відповіді на найпоширеніші питання про екскурсії по Львову</p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                  <svg
                    className={`h-5 w-5 transform text-purple-600 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 p-6 leading-relaxed text-gray-700">{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
