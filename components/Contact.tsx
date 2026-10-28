import { EMAIL, PHONE, PHONE_LABEL, SocialIcon, socials } from './icons';

const messengers = [
  { label: 'Viber', href: `viber://chat?number=%2B${PHONE.slice(1)}` },
  { label: 'Telegram', href: `https://t.me/${PHONE}` },
  { label: EMAIL, href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <section id="contact" data-nav-dark className="bg-night py-24 text-white md:py-32">
      <div className="container mx-auto grid gap-14 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05]">Контакти</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            Щоб замовити екскурсію, подзвоніть або напишіть. Обговоримо дату, маршрут і ваші побажання, зазвичай
            відповідаю протягом кількох годин.
          </p>

          <a
            href={`tel:${PHONE}`}
            className="mt-12 block w-fit whitespace-nowrap font-display text-[clamp(1.6rem,3.9vw,3.6rem)] font-semibold leading-none tracking-tight transition-colors hover:text-gold-300"
          >
            {PHONE_LABEL}
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            {messengers.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('https') && { target: '_blank', rel: 'noopener noreferrer' })}
                className="rounded-full border border-white/20 px-5 py-3 font-medium transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <dl className="mt-14 grid max-w-lg gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-white/50">Де</dt>
              <dd className="mt-1 text-lg">Львів та околиці, виїзди в Карпати й Польщу</dd>
            </div>
            <div>
              <dt className="text-sm text-white/50">Коли</dt>
              <dd className="mt-1 text-lg">Щодня, 9:00–20:00, включно з вихідними</dd>
            </div>
          </dl>

          <div className="mt-10 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-400 hover:text-night"
                aria-label={social.name}
              >
                <SocialIcon path={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="min-h-[360px] flex-1 overflow-hidden rounded-[28px] bg-azure-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.234567890123!2d24.0297!3d49.8397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDUwJzIzLjAiTiAyNMKwMDEnNDYuOSJF!5e0!3m2!1suk!2sua!4v1234567890123!5m2!1suk!2sua"
              width="100%"
              height="100%"
              className="h-full min-h-[360px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Локація Львів"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/oSuowDpaQ7k4WGm67"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-300"
          >
            Залишити відгук на Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
