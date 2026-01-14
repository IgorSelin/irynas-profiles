import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

const blogPosts: Record<
  string,
  {
    title: string;
    description: string;
    content: string;
    date: string;
    readTime: string;
  }
> = {
  zasnuvannya: {
    title: 'Заснування Львова',
    description:
      'Історичні факти та дослідження про заснування Львова. Від перших поселень до утворення міста князем Данилом Романовичем та його сином Левом.',
    date: '2026-01-11',
    readTime: '5 хв',
    content: `
      <h2>Заснування</h2>
      <p>Історики встановили, що на місці сучасного Львова, зокрема на Знесінні і в центрі міста навколо ринку Добробут ще у V столітті існували поселення. Навколишні землі, імовірно, належали до племінного утворення білих, або великих хорватів. В 907 році вони взяли участь у поході київського князя Олега на Константинополь, що свідить про перебування цих теренів, вже у той час, в політичній орбіті Русі. Також, за них, ймовірно, змагалися представники великоморавських і польських династій, поки у 981 році, за свідченням Нестора Літописця їх було остаточно приєднано до Русі Володимиром Святославичем, який збудував свій форпост — град Володимир. Після 1084 року на частині земель Волинського князівства утворився уділ братів Ростиславичів, який став основою для окремого Галицького князівства, до якого відійшли поселення, що стали зародком Львова.</p>
      
      <p>Дату першої згадки про місто за радянського періоду виводили на підставі опису пожежі столичного міста Холма у Галицько-Волинському літописі, котра відбулася орієнтовно навесні 1256 року:</p>
      
      <blockquote>
        <p>… І коли Данило і Василько збиралися до бою з татарами, трапилося таке, як кара за гріхи. Зайнявся Холм через окаянну бабу, і полум'я було таке, що з усієї землі було видно заграву, також і зі Львова по Белзьких полях, бо сильним було полум'я пожежі.</p>
      </blockquote>
      
      <p>Засновником міста традиційно вважають галицького князя Данила Романовича, хоча жодне джерело не дає підстав для такого твердження. Л. Войтович на основі білорусько-литовських літописів і авторів XVI–XVIII ст. стверджує, що місто заклав Лев Данилович. Місто розташувалося на межі належних Левові Перемишльського та Белзького князівств[1]. Я. Ісаєвич припускає, що Данило Романович здійснював загальне керівництво будівництвом, а Лев Данилович керував роботами безпосередньо на місці[2][3]. Л. Войтович зазначає, що Лев уже 1245 р. в битві під Ярославом командував окремим полком, отже, мав власний уділ, у якому міг закладати міста й без дозволу батька[4]. Існує гіпотеза про заснування Львова Данилом Романовичем 1247 року з нагоди одруження Лева Даниловича з угорською принцесою Констанцією, дочкою короля Бели IV. За роки незалежності, на підставі аналізу джерельних матеріалів, Іван Паславський обґрунтував версію про заснування Львова у 1240 році[5]. Мечислав Орлович вказував, що заснування, міста 1240 року певне було пов'язане з жорстоким зруйнуванням княжого Галича[6] 1241 року.[7]</p>
      
      <p>Місто лежало на Галицько-Волинському шляху — відтинку важливого транс'європейського торговельного шляху, що відгалужувався від Великого Шовкового Шляху і через Кілію і Монкастро (тепер Білгород-Дністровський) вів до Галича і далі до Кракова і Німеччини.</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return {
      title: 'Стаття не знайдена',
    };
  }

  return {
    title: `${post.title} | Блог про Львів | Ірина Красіцька`,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Ірина Красіцька',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ірина Красіцька - Екскурсовод',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs
              items={[
                { label: 'Головна', href: '/' },
                { label: 'Блог', href: '/blog' },
                { label: post.title, href: `/blog/${params.slug}` },
              ]}
            />
          </div>
          <article className="bg-white py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <header className="mb-8">
                  <Link href="/blog" className="mb-4 inline-flex items-center text-purple-600 hover:text-purple-700">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Назад до блогу
                  </Link>
                  <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{post.title}</h1>
                  <div className="flex items-center text-gray-500">
                    <time dateTime={post.date}>{post.date ? new Date(post.date).toLocaleDateString('uk-UA') : ''}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} читання</span>
                  </div>
                </header>
                <div
                  className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600 max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="mt-12 rounded-lg bg-purple-50 p-6">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">Замовити екскурсію по Львову</h2>
                  <p className="mb-4 text-gray-700">
                    Хочете побачити все це на власні очі? Замовте екскурсію з професійним гідом Іриною Красіцькою!
                  </p>
                  <Link
                    href="/tours"
                    className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                  >
                    Переглянути екскурсії
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </main>
    </>
  );
}
