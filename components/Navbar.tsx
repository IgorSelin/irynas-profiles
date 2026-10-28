'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Monogram, PhoneIcon, PHONE, PHONE_LABEL } from './icons';

const navLinks = [
  { href: '/#about', label: 'Про мене' },
  { href: '/#tours', label: 'Екскурсії' },
  { href: '/blog', label: 'Блог' },
  { href: '/reviews', label: 'Відгуки' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/#contact', label: 'Контакти' },
];

// Same-page anchors scroll smoothly; on other pages the link navigates to the home page section
function scrollToAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string, offset: number) {
  const element = document.getElementById(href.split('#')[1]);
  if (!element) return false;
  e.preventDefault();
  window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  return true;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();

  // clear: over the home hero or under the open menu; dark/light: a bar matching the section beneath it
  const theme = isOpen || !(scrolled || pathname !== '/') ? 'clear' : onDark ? 'dark' : 'light';
  const light = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setOnDark(
        Array.from(document.querySelectorAll('[data-nav-dark]')).some((el) => {
          const { top, bottom } = el.getBoundingClientRect();
          return top <= 40 && bottom >= 40;
        }),
      );
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        theme === 'light'
          ? 'bg-white/85 text-ink shadow-[0_1px_0_rgba(19,26,44,0.08)] backdrop-blur-xl'
          : theme === 'dark'
            ? 'bg-night/80 text-white shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'
            : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="relative z-[70] flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Monogram className="h-10 w-10 text-[13px] md:h-11 md:w-11 md:text-sm" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[15px] font-semibold tracking-tight md:text-base">
                Ірина Красіцька
              </span>
              <span className={`text-[13px] ${light ? 'text-ink/60' : 'text-white/70'}`}>екскурсії Львовом</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const classes = `rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                light ? 'hover:bg-stone' : 'hover:bg-white/10'
              }`;
              return link.href.includes('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={classes}
                  onClick={(e) => scrollToAnchor(e, link.href, 90)}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={classes}>
                  {link.label}
                </Link>
              );
            })}
            <a
              href={`tel:${PHONE}`}
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-[15px] font-semibold text-night transition-colors hover:bg-gold-300"
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE_LABEL}
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              light ? 'bg-stone' : 'bg-white/10'
            }`}
            aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isOpen}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: full-screen sheet in the night blue */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-night px-6 pb-10 pt-28 text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-[opacity,transform] duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: isOpen ? `${80 + i * 50}ms` : '0ms' }}
            >
              {link.href.includes('#') ? (
                <a
                  href={link.href}
                  className="block py-2 font-display text-3xl font-medium tracking-tight"
                  onClick={(e) => {
                    scrollToAnchor(e, link.href, 70);
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="block py-2 font-display text-3xl font-medium tracking-tight"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <a
          href={`tel:${PHONE}`}
          onClick={() => setIsOpen(false)}
          className="mt-auto flex items-center justify-center gap-3 rounded-full bg-gold-400 px-6 py-4 text-lg font-semibold text-night"
        >
          <PhoneIcon />
          {PHONE_LABEL}
        </a>
      </div>
    </nav>
  );
}
