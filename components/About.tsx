'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Про мене</h2>
          <div className="mx-auto h-1 w-24 bg-purple-600"></div>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[30rem] w-full overflow-hidden rounded-lg shadow-xl">
              <Image src="/images/guide-photo.jpg" alt="Екскурсовод" fill className="object-cover" priority />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">Досвідчений гід по Львову</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Я професійний екскурсовод з багаторічним досвідом роботи у Львові. Моя мета - показати вам найкрасивіші та
              найцікавіші місця нашого міста, розповісти його історію та легенди.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Кожна екскурсія - це унікальна подорож у минуле та сьогодення Львова. Я організовую як індивідуальні, так
              і групові тури, адаптуючи програму під ваші інтереси та побажання.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-800">
                5+ років досвіду
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-800">
                1000+ задоволених туристів
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
