'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#about', label: 'Про мене' },
    { href: '/#tours', label: 'Екскурсії' },
    { href: '/#reviews', label: 'Відгуки' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/#contact', label: 'Контакти' },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled || !isHomePage ? 'bg-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 p-0.5 shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:shadow-purple-500/40 md:h-12 md:w-12">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg className="h-6 w-6 text-white md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400 shadow-sm md:h-4 md:w-4"></div>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span
                className={`text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 md:text-sm ${
                  scrolled || !isHomePage ? 'text-gray-500' : 'text-white/70'
                }`}
              >
                Екскурсії з
              </span>
              <div
                className={`rounded-lg border px-2 py-0.5 transition-all duration-300 ${
                  scrolled || !isHomePage
                    ? 'border-purple-100 bg-purple-50/50 text-purple-700'
                    : 'border-white/20 bg-white/10 text-white backdrop-blur-md'
                }`}
              >
                <span className="text-sm font-bold leading-none md:text-lg">Іриною Красіцькою</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('/') && !link.href.includes('#');

              const linkClasses = `group relative py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                scrolled || !isHomePage ? 'text-gray-700 hover:text-purple-600' : 'text-white/90 hover:text-white'
              }`;

              if (isExternal) {
                return (
                  <Link key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClasses}
                  onClick={(e) => {
                    const targetId = link.href.split('#')[1];
                    const element = document.getElementById(targetId);
                    if (element) {
                      e.preventDefault();
                      const offset = 100; // Navbar height + 20px offset
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
            <a
              href="tel:+380975383348"
              className="group relative flex items-center overflow-hidden rounded-full bg-purple-600 px-6 py-2.5 font-bold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-purple-400/20 to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
              <svg className="mr-2 h-4 w-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden lg:inline">+380 97 538 33 48</span>
              <span className="lg:hidden">Дзвінок</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-xl p-2 transition-colors md:hidden ${
              scrolled || !isHomePage ? 'bg-purple-50 text-purple-600' : 'bg-white/10 text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-[60] border-t border-gray-100 bg-white shadow-2xl md:hidden"
          >
            <div className="container mx-auto space-y-4 px-6 py-8">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Екскурсії з</span>
                <div className="mt-1 rounded-lg border border-purple-100 bg-purple-50/50 px-4 py-1.5 shadow-sm">
                  <span className="text-xl font-bold text-purple-700">Іриною Красіцькою</span>
                </div>
              </div>
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith('/') && !link.href.includes('#');

                const mobileLinkClasses =
                  'block py-3 text-center text-lg font-bold uppercase tracking-widest text-gray-700 transition-colors hover:text-purple-600';

                if (isExternal) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClasses}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      const targetId = link.href.split('#')[1];
                      const element = document.getElementById(targetId);
                      if (element) {
                        e.preventDefault();
                        setIsOpen(false);
                        const offset = 80; // Mobile navbar height + offset
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth',
                        });
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className={mobileLinkClasses}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="tel:+380975383348"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-4 text-center font-bold text-white shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+380 97 538 33 48</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
