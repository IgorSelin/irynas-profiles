"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tour } from "@/lib/types";

const tours: Tour[] = [
  {
    id: "1",
    title: "Історичний центр Львова",
    description:
      "Пішохідна екскурсія по найкрасивіших місцях Старого міста. Ви побачите Площу Ринок, Вірменський квартал, таємничі дворики та дізнаєтесь цікаві історії про місто.",
    duration: "2-3 години",
    image: "/images/tour-historical.jpg",
    highlights: [
      "Площа Ринок",
      "Вірменський квартал",
      "Катедральний собор",
      "Таємничі дворики",
    ],
  },
  {
    id: "2",
    title: "Львівські легенди та міфи",
    description:
      "Захоплююча екскурсія про легенди та міфи Львова. Дізнайтесь про привиди, скарби та таємниці, які приховує наше місто.",
    duration: "2 години",
    image: "/images/tour-legends.jpg",
    highlights: [
      "Легенди про привиди",
      "Історії про скарби",
      "Таємниці старих будинків",
    ],
  },
  {
    id: "3",
    title: "Кавовий Львів",
    description:
      "Екскурсія для любителів кави. Відвідайте найкращі кав'ярні міста, дізнайтесь про історію кави у Львові та скуштуйте унікальні напої.",
    duration: "2.5 години",
    image: "/images/tour-coffee.jpg",
    highlights: [
      "Відвідування кав'ярень",
      "Дегустація кави",
      "Історія кавової культури",
    ],
  },
  {
    id: "4",
    title: "Архітектурні перлини",
    description:
      "Подорож архітектурою Львова від середньовіччя до модерну. Ви побачите найкрасивіші будівлі міста та дізнаєтесь про їх історію.",
    duration: "3 години",
    image: "/images/tour-architecture.jpg",
    highlights: [
      "Готична архітектура",
      "Ренесанс та бароко",
      "Модерн та сецесія",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tour.description}
                </p>
                <div className="flex items-center text-purple-600 mb-4">
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
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Замовити екскурсію
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

