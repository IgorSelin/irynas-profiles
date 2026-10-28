import Link from 'next/link';
import { EMAIL, Monogram, PHONE, PHONE_LABEL, SocialIcon, socials } from './icons';

const links = [
  { label: 'Про мене', href: '/#about' },
  { label: 'Екскурсії', href: '/#tours' },
  { label: 'Блог', href: '/blog' },
  { label: 'Галерея', href: '/gallery' },
  { label: 'Відгуки', href: '/reviews' },
  { label: 'Контакти', href: '/#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-nav-dark className="bg-abyss pb-10 pt-20 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Monogram className="h-12 w-12 text-sm" />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-semibold tracking-tight">Ірина Красіцька</span>
                <span className="text-sm text-white/60">екскурсії Львовом</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              Я показую Львів через деталі, які більшість не помічає. Історія міста без сухих дат — через людей, сенси
              та розуміння міста.
            </p>
          </div>

          <nav aria-label="Нижнє меню" className="lg:col-span-3">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 lg:col-span-4">
            <a href={`tel:${PHONE}`} className="block text-lg font-semibold transition-colors hover:text-gold-300">
              {PHONE_LABEL}
            </a>
            <p className="text-white/60">Telegram, Viber</p>
            <a href={`mailto:${EMAIL}`} className="block text-white/70 transition-colors hover:text-gold-300">
              {EMAIL}
            </a>
            <div className="flex gap-3 pt-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-400 hover:text-night"
                  aria-label={social.name}
                >
                  <SocialIcon path={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-8 text-sm text-white/40">&copy; {currentYear} Ірина Красіцька. Всі права захищені.</p>
      </div>
    </footer>
  );
}
