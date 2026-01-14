'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageWithSkeleton from './ImageWithSkeleton';

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
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Про Ірину Красіцьку</h2>
          <div className="mx-auto h-1 w-24 bg-purple-600"></div>
          <p className="mt-4 text-lg text-gray-600">Досвідчений гід з авторським підходом до екскурсій</p>
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
              <ImageWithSkeleton
                src="/images/guide-photo.webp"
                alt="Ірина Красіцька - професійний екскурсовод у Львові"
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
            <h3 className="text-3xl font-bold text-gray-900">Історія через сенси та людей</h3>
            <h4 className="text-xl font-semibold text-gray-800">Авторський підхід до екскурсій по Львову</h4>
            <p className="text-lg leading-relaxed text-gray-700">
              Я вірю, що екскурсія — це не набір дат і прізвищ, а глибоке розуміння міста. Я показую Львів через деталі,
              які більшість не помічає, і пояснюю їхній сенс простою мовою.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Моя мета — щоб після нашої зустрічі Львів залишився у вашій пам'яті не як декорація, а як жива історія,
              наповнена змістом. Я створюю досвід, який дозволяє відчути душу міста.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-800">
                10+ років досвіду
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
