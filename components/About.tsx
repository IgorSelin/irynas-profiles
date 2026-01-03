"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Про мене
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/guide-photo.jpg"
                alt="Екскурсовод"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Досвідчений гід по Львову
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Я професійний екскурсовод з багаторічним досвідом роботи у Львові.
              Моя мета - показати вам найкрасивіші та найцікавіші місця нашого
              міста, розповісти його історію та легенди.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Кожна екскурсія - це унікальна подорож у минуле та сьогодення
              Львова. Я організовую як індивідуальні, так і групові тури,
              адаптуючи програму під ваші інтереси та побажання.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                5+ років досвіду
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                1000+ задоволених туристів
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

