import ReasonsIndex from './ReasonsIndex';
import { PhoneIcon, PHONE, PHONE_LABEL } from './icons';

const reasons = [
  {
    title: 'Авторський підхід до екскурсій',
    paragraphs: [
      "Я не просто розповідаю стандартні історії з путівників. Кожна моя екскурсія — це унікальна авторська розробка, яка поєднує глибокі знання історії Львова з особистим досвідом та любов'ю до міста. Я показую Львів через деталі, які більшість не помічає: символіку на фасадах, приховані знаки в архітектурі, історії людей, які жили в цих будинках. Це не просто прогулянка — це занурення в атмосферу міста, розуміння його духу та сенсу.",
      "Моя мета — щоб після екскурсії ви не просто запам'ятали кілька фактів, а відчули Львів як живий організм зі своєю історією, традиціями та особливою енергетикою. Я створюю емоційний зв'язок між вами та містом, який залишається надовго.",
    ],
  },
  {
    title: 'Професійний досвід та знання',
    paragraphs: [
      'Більше 10 років я провожу екскурсії по Львову та околицях. За цей час я обслуговувала понад 1000 туристів з різних країн світу. Мій досвід дозволяє мені адаптувати екскурсію під будь-яку аудиторію: від дітей до дорослих, від істориків до тих, хто вперше дізнається про Львів. Я володію українською та польською мовами, що робить екскурсії доступними для широкої аудиторії.',
      'Постійно вивчаю нові матеріали, архівні документи, дослідження істориків та архітекторів. Кожна екскурсія для мене — це можливість поділитися новими відкриттями та цікавими фактами, які я знайшла під час підготовки. Мої знання не обмежуються стандартними путівниками — я глибоко вивчаю кожну тему, щоб дати вам найповнішу та найцікавішу інформацію.',
    ],
  },
  {
    title: 'Індивідуальний підхід до кожного',
    paragraphs: [
      'Я розумію, що кожен турист має свої інтереси та очікування. Тому я завжди адаптую маршрут та зміст екскурсії під вашу групу. Якщо вас цікавить архітектура — ми зосередимося на архітектурних деталях. Якщо легенди — розповім найцікавіші історії. Якщо ви хочете дізнатися про сучасне життя Львова — включу цю тему в екскурсію.',
      'Для індивідуальних екскурсій я створюю унікальний маршрут, який відповідає саме вашим інтересам. Для груп я враховую склад аудиторії та адаптую темп та зміст. Мій підхід дозволяє кожному отримати максимум від екскурсії, незалежно від рівня знань про Львів.',
    ],
  },
  {
    title: 'Широкий вибір маршрутів',
    paragraphs: [
      "Я пропоную понад 25 різних екскурсій по Львову та околицях. Від класичних маршрутів по історичному центру до унікальних тематичних екскурсій: кавовий Львів, підземелля, легенди, архітектура різних епох. Є екскурсії для дітей, корпоративні тури, виїзні екскурсії до замків та природних пам'яток.",
      'Кожен маршрут ретельно продуманий та протестований. Я знаю найкращі точки для фотографій, найцікавіші локації, які часто пропускають стандартні екскурсії, та найзручніші маршрути. Мої екскурсії поєднують історичну точність з цікавим викладом, що робить їх незабутніми для всіх учасників.',
    ],
  },
];

const items = reasons.map((reason, i) => ({ id: `reason-${i + 1}`, title: reason.title }));

function HelpCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-[24px] bg-night p-7 text-white ${className}`}>
      <p className="font-display text-lg font-medium leading-snug">Не знаєте, яку екскурсію обрати?</p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/70">
        Розкажіть про вашу групу, і я підберу маршрут під ваші інтереси.
      </p>
      <a
        href={`tel:${PHONE}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-[15px] font-semibold text-night transition-colors hover:bg-gold-300"
      >
        <PhoneIcon className="h-4 w-4" />
        {PHONE_LABEL}
      </a>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section id="why-choose" className="bg-stone py-24 md:py-32">
      <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex h-full flex-col">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] text-night">
              Чому обирають мене
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink/70">
              Професійний підхід та авторська методика екскурсій по Львову
            </p>
            <div className="mt-10 hidden max-w-sm lg:sticky lg:top-28 lg:block">
              <ReasonsIndex items={items} />
              <HelpCard className="mt-8" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-ink/10">
            {reasons.map((reason, i) => (
              <article
                key={reason.title}
                id={items[i].id}
                className="grid gap-4 py-10 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
              >
                <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-night">
                  <span className="mb-2 block text-xs font-semibold tabular-nums text-gold-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {reason.title}
                </h3>
                <div className="max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-ink/75">
                  {reason.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <HelpCard className="mt-12 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
