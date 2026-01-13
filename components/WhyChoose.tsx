'use client';

import { motion } from 'framer-motion';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Чому обирають мене</h2>
          <div className="mx-auto h-1 w-24 bg-purple-600"></div>
          <p className="mt-4 text-lg text-gray-600">
            Професійний підхід та авторська методика екскурсій по Львову
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="space-y-8 text-lg leading-relaxed text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Авторський підхід до екскурсій</h3>
              <p className="mb-4">
                Я не просто розповідаю стандартні історії з путівників. Кожна моя екскурсія — це унікальна авторська
                розробка, яка поєднує глибокі знання історії Львова з особистим досвідом та любов'ю до міста. Я
                показую Львів через деталі, які більшість не помічає: символіку на фасадах, приховані знаки в
                архітектурі, історії людей, які жили в цих будинках. Це не просто прогулянка — це занурення в
                атмосферу міста, розуміння його духу та сенсу.
              </p>
              <p>
                Моя мета — щоб після екскурсії ви не просто запам'ятали кілька фактів, а відчули Львів як живий
                організм зі своєю історією, традиціями та особливою енергетикою. Я створюю емоційний зв'язок між вами
                та містом, який залишається надовго.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Професійний досвід та знання</h3>
              <p className="mb-4">
                Більше 10 років я провожу екскурсії по Львову та околицях. За цей час я обслуговувала понад 1000
                туристів з різних країн світу. Мій досвід дозволяє мені адаптувати екскурсію під будь-яку аудиторію:
                від дітей до дорослих, від істориків до тих, хто вперше дізнається про Львів. Я володію українською
                та польською мовами, що робить екскурсії доступними для широкої аудиторії.
              </p>
              <p>
                Постійно вивчаю нові матеріали, архівні документи, дослідження істориків та архітекторів. Кожна
                екскурсія для мене — це можливість поділитися новими відкриттями та цікавими фактами, які я знайшла
                під час підготовки. Мої знання не обмежуються стандартними путівниками — я глибоко вивчаю кожну
                тему, щоб дати вам найповнішу та найцікавішу інформацію.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Індивідуальний підхід до кожного</h3>
              <p className="mb-4">
                Я розумію, що кожен турист має свої інтереси та очікування. Тому я завжди адаптую маршрут та
                зміст екскурсії під вашу групу. Якщо вас цікавить архітектура — ми зосередимося на архітектурних
                деталях. Якщо легенди — розповім найцікавіші історії. Якщо ви хочете дізнатися про сучасне життя
                Львова — включу цю тему в екскурсію.
              </p>
              <p>
                Для індивідуальних екскурсій я створюю унікальний маршрут, який відповідає саме вашим інтересам. Для
                груп я враховую склад аудиторії та адаптую темп та зміст. Мій підхід дозволяє кожному отримати
                максимум від екскурсії, незалежно від рівня знань про Львів.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Широкий вибір маршрутів</h3>
              <p className="mb-4">
                Я пропоную понад 25 різних екскурсій по Львову та околицях. Від класичних маршрутів по історичному
                центру до унікальних тематичних екскурсій: кавовий Львів, підземелля, легенди, архітектура різних
                епох. Є екскурсії для дітей, корпоративні тури, виїзні екскурсії до замків та природних пам'яток.
              </p>
              <p>
                Кожен маршрут ретельно продуманий та протестований. Я знаю найкращі точки для фотографій, найцікавіші
                локації, які часто пропускають стандартні екскурсії, та найзручніші маршрути. Мої екскурсії
                поєднують історичну точність з цікавим викладом, що робить їх незабутніми для всіх учасників.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-3 text-3xl font-bold text-purple-600">10+</div>
              <div className="text-lg font-semibold text-gray-900">років досвіду</div>
              <div className="mt-2 text-gray-600">Проведення професійних екскурсій</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-3 text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-lg font-semibold text-gray-900">задоволених туристів</div>
              <div className="mt-2 text-gray-600">Позитивні відгуки та рекомендації</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-3 text-3xl font-bold text-purple-600">25+</div>
              <div className="text-lg font-semibold text-gray-900">унікальних маршрутів</div>
              <div className="mt-2 text-gray-600">Різноманітні екскурсії на будь-який смак</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
