"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AdditionalTour {
  id: string;
  title: string;
  description: string;
  duration?: string;
  languages: string[];
  type: "individual" | "corporate" | "both";
  image: string;
  highlights?: string[];
}

const additionalTours: AdditionalTour[] = [
  {
    id: "1",
    title: "Шевченківський гай",
    description:
      "Шевченківський гай – це не лише про архітектуру українських сіл. Це про нас із вами. Адже в цих хатах, під цими стріхами формувався український менталітет: працьовитість, гостинність, любов до землі й традицій.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-shevchenkivskyi-hai.jpg",
    highlights: [
      "Архітектура українських сіл",
      "Історія українського менталітету",
      "Традиції та культура",
    ],
  },
  {
    id: "2",
    title: "Замки Золотої Підкови",
    description:
      "Замки Золотої Підкови – це подорож у часі! Олесько – місце народження короля Яна III Собеського, Підгірці зачаровують палацом магнатів, а Золочів зберігає загадки королів і шляхти.",
    duration: "10:00 - 19:00",
    languages: ["Українська", "Польська"],
    type: "corporate",
    image: "/images/additional-golden-horseshoe.jpg",
    highlights: [
      "Олеський замок",
      "Підгорецький замок",
      "Золочівський замок",
    ],
  },
  {
    id: "3",
    title: "Жовква та Крехів",
    description:
      "Львівська Королівська Жовква – місце, де починаються легенди. Ідеальне місто Жолкевського і Собеського пам'ятає королівські інтриги. Ратуша вабить панорамою, а Замок – духом старовини. Завершіть подорож у тиші Крехівського монастиря!",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-zhovkva-krekhiv.jpg",
    highlights: [
      "Королівська Жовква",
      "Жовківський замок",
      "Крехівський монастир",
    ],
  },
  {
    id: "4",
    title: "Замки Тернопілля",
    description:
      "Замки Тернопілля – скарби історії! Бережанський замок Синявських вражає ренесансною архітектурою, Збаразький пам'ятає облоги козаків, а Вишнівецький – родове гніздо князів, що захоплює розкішшю.",
    languages: ["Українська", "Польська"],
    type: "corporate",
    image: "/images/additional-ternopil-castles.jpg",
    highlights: [
      "Бережанський замок",
      "Збаразький замок",
      "Вишнівецький замок",
    ],
  },
  {
    id: "5",
    title: "Фортеця Тустань",
    description:
      "Унікальна фортеця, вирубана в скелі. Пам'ятка археології та архітектури національного значення. Відчуйте дух середньовіччя та подивіться на мальовничі Карпати.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-tustan.jpg",
    highlights: [
      "Фортеця в скелі",
      "Середньовічна архітектура",
      "Мальовничі Карпати",
    ],
  },
  {
    id: "6",
    title: "Кам'янецький водоспад та Мертве озеро",
    description:
      "Кам'янецький водоспад розташований біля міста Сколе, в межах Національного природного парку «Сколівські Бескиди». Водоспад невеликий, але дуже мальовничий, особливо після дощів.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-waterfall.jpg",
    highlights: [
      "Кам'янецький водоспад",
      "Мертве озеро",
      "Сколівські Бескиди",
    ],
  },
  {
    id: "7",
    title: "Одноденні тури до Польщі: Красічин та Перемишль",
    description:
      "Подорож до Польщі з відвідуванням замку в Красічині та історичного міста Перемишль. Знайомство з польською культурою та архітектурою.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-poland-krasiczyn.jpg",
    highlights: [
      "Замок у Красічині",
      "Перемишль",
      "Польська культура",
    ],
  },
  {
    id: "8",
    title: "Одноденні тури до Польщі: Ланцют та Жешів",
    description:
      "Відвідайте один з найкрасивіших замків Польщі в Ланцюті та місто Жешів з багатою історією та культурою.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-poland-lancut.jpg",
    highlights: [
      "Замок у Ланцюті",
      "Місто Жешів",
      "Польська архітектура",
    ],
  },
  {
    id: "9",
    title: "Одноденні тури до Польщі: Краків та Велічка",
    description:
      "Королівський Краків – колишня столиця Польщі, та соляні копальні Велічка, включені до списку UNESCO. Незрівнянна подорож у минуле.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-poland-krakow.jpg",
    highlights: [
      "Королівський Краків",
      "Соляні копальні Велічка",
      "UNESCO пам'ятки",
    ],
  },
  {
    id: "10",
    title: "Одноденні тури до Польщі: Сянок та водосховище Соліна",
    description:
      "Мальовниче місто Сянок та водосховище Соліна – одне з найбільших штучних озер у Польщі. Відпочинок та природа.",
    languages: ["Українська", "Польська"],
    type: "both",
    image: "/images/additional-poland-solina.jpg",
    highlights: [
      "Місто Сянок",
      "Водосховище Соліна",
      "Природа та відпочинок",
    ],
  },
];

export default function AdditionalServices() {
  return (
    <section id="additional-services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Додаткові послуги
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Додатково пропоную такі тури українською та польською мовами,
            індивідуальні та для корпоративних груп
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {additionalTours.map((tour, index) => (
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
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  {tour.description}
                </p>
                <div className="space-y-2 mb-4">
                  {tour.duration && (
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
                      <span className="font-semibold text-sm">
                        {tour.duration}
                      </span>
                    </div>
                  )}
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="font-semibold text-sm">
                      {tour.type === "both"
                        ? "Індивідуальні та корпоративні"
                        : tour.type === "corporate"
                        ? "Для корпоративних груп"
                        : "Індивідуальні"}
                    </span>
                  </div>
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
                  Замовити тур
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

