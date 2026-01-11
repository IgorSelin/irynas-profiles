'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 pb-8 pt-20 text-white">
      {/* Background Decor */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"></div>
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl"></div>

      <div className="container relative mx-auto px-4">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-8 flex items-center space-x-3 transition-transform hover:scale-105">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 p-0.5 shadow-lg transition-all duration-500 group-hover:rotate-12 md:h-12 md:w-12">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <svg className="h-6 w-6 text-white md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                  </svg>
                </div>
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400 shadow-sm md:h-4 md:w-4"></div>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 md:text-xs">
                  Екскурсії з
                </span>
                <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 backdrop-blur-md">
                  <span className="text-sm font-bold leading-none text-white md:text-lg">Іриною Красіцькою</span>
                </div>
              </div>
            </Link>
            <p className="leading-relaxed text-gray-400">
              Ваш персональний провідник у світ історії та краси. Відкрийте для себе Львів та околиці з професійним
              гідом, який знає кожну вуличку.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-widest text-white">Навігація</h3>
            <ul className="space-y-4">
              {[
                { label: 'Про мене', href: '/#about' },
                { label: 'Екскурсії', href: '/#tours' },
                { label: 'Галерея', href: '/gallery' },
                { label: 'Відгуки', href: '/#reviews' },
                { label: 'Контакти', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 transition-colors hover:text-purple-400"
                  >
                    <span className="mr-2 h-1 w-0 bg-purple-500 transition-all group-hover:w-4"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-widest text-white">Контакти</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <svg className="mt-1 h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
                <span>Львів, Україна</span>
              </li>
              <li>
                <a
                  href="tel:+380975383348"
                  className="group flex items-center space-x-3 transition-colors hover:text-purple-400"
                >
                  <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-semibold">+380 97 538 33 48</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:iryna@example.com"
                  className="group flex items-center space-x-3 transition-colors hover:text-purple-400"
                >
                  <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>iryna@example.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-widest text-white">Соцмережі</h3>
            <div className="flex space-x-4">
              {[
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'Facebook', icon: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' },
                { name: 'Telegram', icon: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-2.003 9.464c-.149.659-.539.822-1.091.511l-3.051-2.25-1.472 1.416c-.163.163-.3.299-.614.299l.219-3.107 5.652-5.111c.245-.219-.054-.341-.378-.126l-6.991 4.402-3.012-.942c-.655-.205-.667-.655.137-.969l11.771-4.534c.544-.203 1.02.122.822.846z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-purple-600 hover:text-white"
                  aria-label={social.name}
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 text-center text-gray-500 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">&copy; {currentYear} Ірина Красіцька. Всі права захищені.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-white transition-colors">Умови використання</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
