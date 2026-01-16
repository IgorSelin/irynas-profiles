import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
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
      modifiedTime: post.date,
      authors: ['Ірина Красіцька'],
      ...(post.image && {
        images: [
          {
            url: `${baseUrl}${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.image && {
        images: [`${baseUrl}${post.image}`],
      }),
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
    dateModified: post.date,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    author: {
      '@type': 'Person',
      name: 'Ірина Красіцька',
      jobTitle: 'Екскурсовод у Львові',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ірина Красіцька - Екскурсовод',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/guide-photo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${params.slug}`,
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
                {post.image && (
                  <div className="mb-8">
                    <div className="relative h-96 w-full overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    </div>
                    {post.imageCaption && (
                      <p className="mt-2 text-center text-sm italic text-gray-600">{post.imageCaption}</p>
                    )}
                  </div>
                )}
                <div
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                    prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:text-purple-700 prose-h2:font-extrabold
                    prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-800 prose-h3:font-bold
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                    prose-a:text-purple-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700
                    prose-ul:my-6 prose-ul:space-y-2
                    prose-ol:my-6 prose-ol:space-y-2
                    prose-li:text-gray-700 prose-li:leading-relaxed
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
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
