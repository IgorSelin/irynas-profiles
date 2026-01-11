'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Контакти</h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Зв'яжіться зі мною для замовлення екскурсії</p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">Зв'яжіться зі мною</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      className="mr-4 mt-1 h-6 w-6 text-purple-600"
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
                    <div>
                      <p className="font-semibold text-gray-900">Телефон / Messenger</p>
                      <div className="flex flex-col space-y-1">
                        <a href="tel:+380975383348" className="text-purple-600 hover:text-purple-700">
                          +380 97 538 33 48
                        </a>
                        <div className="flex space-x-3 text-sm">
                          <a
                            href="https://t.me/+380975383348"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-purple-600"
                          >
                            Telegram
                          </a>
                          <span className="text-gray-300">|</span>
                          <a href="viber://chat?number=%2B380975383348" className="text-gray-500 hover:text-purple-600">
                            Viber
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="mr-4 mt-1 h-6 w-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="krasiraira@gmail.com" className="text-purple-600 hover:text-purple-700">
                        krasiraira@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="mr-4 mt-1 h-6 w-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Локація</p>
                      <p className="text-gray-700">Львів, Україна</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="mb-4 font-semibold text-gray-900">Соціальні мережі</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/ekskursii.lviv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.13 4.771 1.69 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.13-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@iryna_ekscurs_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700"
                      aria-label="TikTok"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.72.5-.99 1.47-.73 2.28.21.8.87 1.35 1.66 1.42 1 .15 2.1-.39 2.48-1.32.12-.27.16-.57.17-.86.03-4.69.03-9.39.04-14.09z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.facebook.com/irina.krasic.ka.55959"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700"
                      aria-label="Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Google Maps Reviews Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg sm:p-6"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl">Залиште відгук на Google Maps!</h3>
                    <p className="mb-3 text-sm text-purple-100 sm:mb-4 sm:text-base">
                      Ваші відгуки допомагають іншим знайти якісні екскурсії. Будемо вдячні за вашу оцінку!
                    </p>
                    <a
                      href="https://maps.app.goo.gl/oSuowDpaQ7k4WGm67"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-600 shadow-md transition-colors hover:bg-purple-50 sm:px-6 sm:py-3 sm:text-base"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      <span>Залишити відгук</span>
                      <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
