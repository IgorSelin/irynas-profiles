"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tour } from "@/lib/types";

const tours: Tour[] = [
  {
    id: "1",
    title: "Середньовічний Львів",
    description:
      "В Середньовічному місті каміння оживає на кожному кроці. Площа Ринок із її унікальними кам'яницями, колишні квартали ремісників, торгівців і аристократів розповідають історії з XVI століття. Старі міські брами, вузькі вулички та архітектура готики, ренесансу та бароко створюють неповторну атмосферу.",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-medieval.jpg",
    highlights: [
      "Площа Ринок",
      "Квартали ремісників",
      "Готична архітектура",
      "Ренесанс та бароко",
    ],
  },
  {
    id: "2",
    title: "Підземелля Львова",
    description:
      "Львівські підземелля – справжній світ таємниць! Єзуїтський костел, аптека-музей, підземелля Домініканів переносять у середньовіччя, а ресторанні підвали на площі Ринок розкривають атмосферу стародавнього Львова із сучасним смаком. Відкрийте невидимий Львів!",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-underground.jpg",
    highlights: [
      "Єзуїтський костел",
      "Аптека-музей",
      "Підземелля Домініканів",
      "Ресторанні підвали",
    ],
  },
  {
    id: "3",
    title: "Золота доба австрійського Львова",
    description:
      "Запрошую на прогулянку австрійським Львовом — містом, яке розквітло в добу Габсбургів! Ви побачите величний Оперний театр, монументальну Галицьку касу, елегантне Кінське казино, Галицький сейм, де вирішувались долі, та розкішний Палац Потоцьких.",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-austrian.jpg",
    highlights: [
      "Оперний театр",
      "Галицька каса",
      "Кінське казино",
      "Палац Потоцьких",
    ],
  },
  {
    id: "4",
    title: "Львів очима Карлсона",
    description:
      "Львів з висоти – це прекрасна картина! Дахи міста розповідають свої історії, а з Ратуші, до якої ведуть 408 сходинок, відкривається панорама, що зачаровує. Відчуйте Львів зверху – романтика, історія і краса в одному погляді!",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-carlson.jpg",
    highlights: [
      "Ратуша (408 сходинок)",
      "Панорама міста",
      "Дахи Львова",
      "Вид з висоти",
    ],
  },
  {
    id: "5",
    title: "Автобусна екскурсія",
    description:
      "Маршрут адаптую під ваші інтереси та кількість учасників. Це зручний спосіб побачити місто, дізнатись його історії та відчути атмосферу. В рамках 3-4 годинної екскурсії ви відвідаєте собор Юра, Львівську Політехніку, собор Єлизавети та Ольги, Личаківське кладовище, міський парк Високий замок.",
    duration: "3-4 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-bus.jpg",
    highlights: [
      "Собор Юра",
      "Львівська Політехніка",
      "Собор Єлизавети та Ольги",
      "Високий замок",
    ],
  },
  {
    id: "6",
    title: "Оперний театр",
    description:
      "Львівський Оперний театр - перлина архітектури й мистецтва, збудований у кінці ХIХ століття. Його розкішні інтер'єри зачаровують: позолота, мармур і витончені фрески. Тут виступала легендарна Соломія Крушельницька, яка прославила українську оперу у світі.",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-opera.jpg",
    highlights: [
      "Розкішні інтер'єри",
      "Позолота та мармур",
      "Історія Соломії Крушельницької",
      "Архітектура ХІХ століття",
    ],
  },
  {
    id: "7",
    title: "Вілли Кастелівки",
    description:
      "Архітектурна казка: Вілли Кастелівки — це шарм модерну та історизму в кожній деталі. Пройдемось слідами еліти та дізнаємось, як жили львівські інтелігенти кінця ХІХ століття.",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-castelivka.jpg",
    highlights: [
      "Архітектура модерну",
      "Історизм",
      "Вілли еліти",
      "Львівська інтелігенція",
    ],
  },
  {
    id: "8",
    title: "Личаківське кладовище",
    description:
      "Личаківський цвинтар – це не просто місце спочинку, це музей під відкритим небом, найстаріший діючий цвинтар у світі, де кожна алея зберігає історії любові, слави та загадок. Чи знаєте ви, які таємниці про людські долі приховують мармурові статуї?",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-lychakiv.jpg",
    highlights: [
      "Музей під відкритим небом",
      "Мармурові статуї",
      "Історії любові та слави",
      "Найстаріший діючий цвинтар",
    ],
  },
  {
    id: "9",
    title: "Історія Львова з дахів",
    description:
      "Унікальна екскурсія, яка проводиться з різних високих точок міста! З дахів та оглядових майданчиків ви побачите Львів з незвичного ракурсу, дізнаєтесь історії міста, які розкриваються лише з висоти. Кожна точка огляду розповідає свою частину історії Львова, створюючи неповторний досвід пізнання міста.",
    duration: "2 години",
    price: "200 грн/ос",
    languages: ["Українська", "Польська"],
    image: "/images/tour-carlson.jpg",
    highlights: [
      "Різні високі точки міста",
      "Оглядові майданчики",
      "Панорама Львова",
      "Історія з незвичного ракурсу",
    ],
  },
];

export default function Tours() {
  return (
    <section id="tours" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Доступні екскурсії
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Оберіть екскурсію, яка вас найбільше цікавить
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
            >
              <div className="relative h-64">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tour.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-purple-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                  {tour.languages && tour.languages.length > 0 && (
                    <div className="flex items-center text-blue-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      <span className="font-semibold text-sm">
                        {tour.languages.join(" / ")}
                      </span>
                    </div>
                  )}
                </div>
                {tour.highlights && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Що ви побачите:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {tour.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <a
                  href="tel:+380975383348"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center mt-auto"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Замовити екскурсію
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

