import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

export const metadata: Metadata = {
  title: 'Блог про Львів | Історія, легенди, архітектура | Ірина Красіцька',
  description:
    'Цікаві статті про Львів: історія міста, легенди, архітектура, кавова культура. Дізнайтеся більше про найкрасивіше місто України від професійного екскурсовода.',
  keywords: 'блог про Львів, історія Львова, легенди Львова, архітектура Львова, кава Львів, статті про Львів',
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: 'Блог про Львів | Історія, легенди, архітектура',
    description: 'Цікаві статті про Львів від професійного екскурсовода Ірини Красіцької.',
    url: `${baseUrl}/blog`,
    type: 'website',
  },
};

const blogPosts = [
  {
    slug: 'zasnuvannya',
    title: 'Заснування Львова',
    description:
      'Історичні факти та дослідження про заснування Львова. Від перших поселень до утворення міста князем Данилом Романовичем та його сином Левом.',
    date: '2026-01-11',
    readTime: '5 хв',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Головна', href: '/' },
              { label: 'Блог', href: '/blog' },
            ]}
          />
        </div>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Блог про Львів</h1>
              <div className="mx-auto mb-8 h-1 w-24 bg-purple-600"></div>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Цікаві статті про історію, культуру та архітектуру Львова від професійного екскурсовода
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                          <time dateTime={post.date}>
                            {post.date ? new Date(post.date).toLocaleDateString('uk-UA') : ''}
                          </time>
                          <span className="mx-2">•</span>
                          <span>{post.readTime} читання</span>
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                          {post.title}
                        </h2>
                        <p className="mb-4 text-gray-600">{post.description}</p>
                        <span className="inline-flex items-center font-semibold text-purple-600 group-hover:text-purple-700">
                          Читати далі
                          <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
