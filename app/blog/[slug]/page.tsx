import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogPosts';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krasitskatours.com';

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
