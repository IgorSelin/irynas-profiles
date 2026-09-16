import { cache } from 'react';
import { createReader } from '@keystatic/core/reader';
import Markdoc, { type Node } from '@markdoc/markdoc';
import keystaticConfig from '@/keystatic.config';
import { BlogPost, Tour } from '@/lib/types';

const reader = createReader(process.cwd(), keystaticConfig);

const WORDS_PER_MINUTE = 180;

function renderMarkdoc(node: Node) {
  const article = Markdoc.transform(node);
  const children = Markdoc.Tag.isTag(article) ? article.children : [article];
  return Markdoc.renderers.html(children);
}

function readTime(html: string) {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} хв`;
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const entries = await reader.collections.posts.all({ resolveLinkedFiles: true });

  return entries
    .map(({ slug, entry }) => {
      const content = renderMarkdoc(entry.content.node);
      return {
        slug,
        title: entry.title,
        description: entry.description,
        content,
        date: entry.date ?? '',
        readTime: readTime(content),
        image: entry.image ?? undefined,
        imageAlt: entry.imageAlt || undefined,
        imageCaption: entry.imageCaption || undefined,
        keywords: entry.keywords || undefined,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export const getTours = cache(async (): Promise<Tour[]> => {
  const entries = await reader.collections.tours.all();

  return entries
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0) || a.entry.title.localeCompare(b.entry.title, 'uk'))
    .map(({ slug, entry }) => ({
      // Reviews in Firestore reference the old numeric ids, so keep them where they exist.
      id: entry.reviewsId || slug,
      slug,
      title: entry.title,
      description: entry.description,
      duration: entry.duration,
      image: entry.image,
      price: entry.price || undefined,
      languages: [...entry.languages],
      highlights: [...entry.highlights],
      type: entry.type === 'none' ? undefined : entry.type,
      tags: [...entry.tags],
    }));
});
