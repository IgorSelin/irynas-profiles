'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Як проходять екскурсії</h2>
          <div className="mx-auto h-1 w-24 bg-purple-600"></div>
          <p className="mt-4 text-lg text-gray-600">Простий процес від замовлення до незабутньої подорожі</p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="space-y-8 text-lg leading-relaxed text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Замовлення та бронювання</h3>
              <p className="mb-4">
                Замовити екскурсію дуже просто. Ви можете зв'язатися зі мною за телефоном +380975383348, через
                Viber, написати на email krasiraira@gmail.com або заповнити форму на сайті. Також можна написати
                мені в соціальних мережах — Instagram, Facebook або TikTok. Я завжди намагаюся відповісти якнайшвидше,
                зазвичай протягом кількох годин.
              </p>
              <p>
                Під час бронювання ми обговоримо дату та час екскурсії, кількість учасників, ваші інтереси та
                особливі побажання. Я допоможу обрати найкращий маршрут для вашої групи та адаптую його під ваші
                потреби. Для виїзних екскурсій та корпоративних груп рекомендую бронювати за тиждень наперед,
                особливо в туристичний сезон.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Підготовка до екскурсії</h3>
              <p className="mb-4">
                Перед екскурсією я надсилаю вам детальну інформацію: місце зустрічі, приблизний маршрут, що взяти
                з собою, та рекомендації щодо одягу та взуття. Для піших екскурсій рекомендую зручне взуття, оскільки
                ми багато ходимо. Взимку варто тепло одягнутися, влітку — взяти воду та головний убір.
              </p>
              <p>
                Якщо у вас є особливі побажання або запити щодо маршруту, ми можемо обговорити їх заздалегідь. Я
                завжди готова адаптувати екскурсію під ваші інтереси та можливості. Для дітей я можу зробити
                екскурсію більш інтерактивною та ігровою, для людей з обмеженими можливостями — обрати найзручніший
                маршрут.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Під час екскурсії</h3>
              <p className="mb-4">
                Екскурсія починається зі зустрічі в обговореному місці. Я завжди приходжу вчасно та готова до
                роботи. Під час екскурсії я розповідаю цікаві історії, показую унікальні деталі, відповідаю на
                питання та створюю дружню атмосферу. Ви можете в будь-який момент задати питання, зробити паузу
                для фотографій або попросити зупинитися біля цікавого місця.
              </p>
              <p>
                Мої екскурсії — це не монолог, а діалог. Я люблю, коли учасники задають питання, діляться своїми
                враженнями та спостереженнями. Це робить екскурсію більш живою та цікавою. Я також показую найкращі
                місця для фотографій та допомагаю зробити гарні кадри. Після екскурсії ви залишитеся не лише з
                знаннями, але й з чудовими спогадами та фотографіями.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid gap-8 md:grid-cols-3"
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                  1
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold text-gray-900">Замовлення</h4>
              <p className="text-gray-600">Зв'яжіться зі мною та обговоріть деталі</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                  2
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold text-gray-900">Підготовка</h4>
              <p className="text-gray-600">Отримайте всю необхідну інформацію</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                  3
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold text-gray-900">Екскурсія</h4>
              <p className="text-gray-600">Насолоджуйтесь незабутньою подорожжю</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
