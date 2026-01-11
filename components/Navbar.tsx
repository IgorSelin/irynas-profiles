'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { href: '/#additional-services', label: 'Додаткові послуги' },
    { href: '/#reviews', label: 'Відгуки' },
    { href: '/gallery', label: 'Галерея' },
    { href: '/#contact', label: 'Контакти' },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 shadow-md backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-purple-600 transition-colors hover:text-purple-700 md:text-2xl"
          >
            <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Екскурсовод Львів</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('/') && !link.href.includes('#');
              const isAnchor = link.href.includes('#');

              if (isExternal) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative font-medium text-gray-700 transition-colors hover:text-purple-600"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all group-hover:w-full" />
                  </Link>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative font-medium text-gray-700 transition-colors hover:text-purple-600"
                  onClick={(e) => {
                    const targetId = link.href.split('#')[1];
                    const element = document.getElementById(targetId);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all group-hover:w-full" />
                </a>
              );
            })}
            <a
              href="tel:+380975383348"
              className="flex items-center space-x-2 rounded-full bg-purple-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="p-2 text-gray-700 transition-colors hover:text-purple-600 md:hidden"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-white md:hidden"
          >
            <div className="container mx-auto space-y-4 px-4 py-4">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith('/') && !link.href.includes('#');

                if (isExternal) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 font-medium text-gray-700 transition-colors hover:text-purple-600"
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
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        // If element not found (e.g. on another page), let it navigate
                        setIsOpen(false);
                      }
                    }}
                    className="block py-2 font-medium text-gray-700 transition-colors hover:text-purple-600"
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="tel:+380975383348"
                onClick={() => setIsOpen(false)}
                className="block flex items-center justify-center space-x-2 rounded-lg bg-purple-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-purple-700"
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
