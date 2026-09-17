import { collection, config, fields, singleton } from '@keystatic/core';

// Locally (`npm run dev`) edits are written straight to the files on disk.
// In production edits go through Keystatic Cloud, which commits them to GitHub and triggers a Vercel redeploy.
const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;
const useCloud = process.env.NODE_ENV === 'production' && Boolean(cloudProject);

// Local mode has no authentication, so the admin UI and API must only be reachable in `npm run dev`.
export const isKeystaticEnabled = useCloud || process.env.NODE_ENV === 'development';

export default config({
  storage: useCloud ? { kind: 'cloud' } : { kind: 'local' },
  ...(useCloud && { cloud: { project: cloudProject! } }),
  locale: 'uk-UA',
  ui: {
    brand: { name: 'Ірина Красіцька' },
    navigation: {
      Контент: ['posts', 'tours'],
      Налаштування: ['marketing'],
    },
  },
  singletons: {
    marketing: singleton({
      label: 'Реклама та аналітика',
      path: 'content/settings/marketing',
      format: { data: 'yaml' },
      schema: {
        metaPixelId: fields.text({
          label: 'Meta Pixel ID (Facebook та Instagram)',
          description: 'Тільки цифри з Meta Events Manager. Наприклад: 1234567890123456. Порожньо — піксель вимкнений.',
          validation: { pattern: { regex: /^(\d{8,20})?$/, message: 'Тут мають бути тільки цифри' } },
        }),
        tiktokPixelId: fields.text({
          label: 'TikTok Pixel ID',
          description: 'З TikTok Ads Manager (Events). Наприклад: C4T8R2N0Q5J3K7L1M6P9.',
          validation: {
            pattern: { regex: /^([A-Z0-9]{10,30})?$/, message: 'Тільки великі латинські літери та цифри' },
          },
        }),
        googleTagId: fields.text({
          label: 'Google Tag ID (Analytics / Google Ads)',
          description: 'Починається з G- або AW-. Наприклад: G-ABC123XYZ.',
          validation: { pattern: { regex: /^((G|AW)-[A-Z0-9]{4,20})?$/, message: 'Має починатися з G- або AW-' } },
        }),
        gtmId: fields.text({
          label: 'Google Tag Manager ID',
          description: 'Починається з GTM-. Заповнюйте, лише якщо про це просить фахівець.',
          validation: { pattern: { regex: /^(GTM-[A-Z0-9]{4,12})?$/, message: 'Має починатися з GTM-' } },
        }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Блог',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      previewUrl: '/blog/{slug}',
      schema: {
        title: fields.slug({
          name: {
            label: 'Заголовок',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Адреса сторінки',
            description: 'Латиницею, через дефіс. Наприклад: lviv-kava. Після публікації краще не змінювати.',
          },
        }),
        description: fields.text({
          label: 'Короткий опис',
          description: 'Показується в списку статей та в Google (до ~160 символів).',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Дата публікації',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Головне фото',
          description: 'Бажано горизонтальне, у форматі .webp або .jpg.',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        imageAlt: fields.text({
          label: 'Опис фото для Google',
          description: 'Що зображено на фото. Допомагає SEO.',
        }),
        imageCaption: fields.text({
          label: 'Підпис під фото',
        }),
        keywords: fields.text({
          label: 'Ключові слова',
          description: 'Через кому. Необовʼязково.',
          multiline: true,
        }),
        content: fields.markdoc({
          label: 'Текст статті',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
            code: false,
            codeBlock: false,
            table: false,
          },
        }),
      },
    }),
    tours: collection({
      label: 'Екскурсії',
      slugField: 'title',
      path: 'content/tours/*',
      format: { data: 'yaml' },
      columns: ['title', 'price'],
      previewUrl: '/tours/{slug}',
      schema: {
        title: fields.slug({
          name: {
            label: 'Назва',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Адреса сторінки',
            description: 'Латиницею, через дефіс. Після публікації краще не змінювати.',
          },
        }),
        order: fields.integer({
          label: 'Порядок у списку',
          description: 'Менше число — вище у списку екскурсій.',
          defaultValue: 100,
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Опис',
          multiline: true,
          validation: { isRequired: true },
        }),
        duration: fields.text({
          label: 'Тривалість',
          description: 'Наприклад: 2 години',
          validation: { isRequired: true },
        }),
        price: fields.text({
          label: 'Ціна',
          description: 'Наприклад: 200 грн/ос',
        }),
        image: fields.image({
          label: 'Фото',
          directory: 'public/images/tours',
          publicPath: '/images/tours/',
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: 'Формат',
          options: [
            { label: 'Не вказувати', value: 'none' },
            { label: 'Індивідуальна', value: 'individual' },
            { label: 'Корпоративна', value: 'corporate' },
            { label: 'Індивідуальна та корпоративна', value: 'both' },
          ],
          defaultValue: 'none',
        }),
        languages: fields.array(fields.text({ label: 'Мова' }), {
          label: 'Мови',
          itemLabel: (props) => props.value,
        }),
        highlights: fields.array(fields.text({ label: 'Пункт' }), {
          label: 'Що побачите',
          itemLabel: (props) => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Тег' }), {
          label: 'Теги',
          description: 'За тегами відвідувачі фільтрують екскурсії.',
          itemLabel: (props) => props.value,
        }),
        reviewsId: fields.text({
          label: 'Технічний ID для відгуків',
          description: 'Не змінюйте. Для нової екскурсії залиште порожнім.',
        }),
      },
    }),
  },
});
