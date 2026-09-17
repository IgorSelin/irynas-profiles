# Сайт-візитка екскурсовода Львів

Сучасний сайт-візитка для львівського екскурсовода, створений на Next.js 14 з TypeScript.

## Особливості

- 🎨 Сучасний та привабливий дизайн
- 📱 Повністю адаптивний для мобільних пристроїв
- 🎭 Анімації через Framer Motion
- 🔥 Інтеграція з Firebase для відгуків
- 🗺️ Google Maps для показу локації
- 🔍 SEO оптимізація
- ⚡ Швидка продуктивність завдяки Next.js

## Технології

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Firestore)
- Framer Motion
- React Hook Form

## Встановлення

1. Встановіть залежності:

```bash
npm install
```

2. Створіть файл `.env.local` та додайте ваші Firebase credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Site Configuration (ОБОВ'ЯЗКОВО для SEO!)
NEXT_PUBLIC_SITE_URL=https://krasitskatours.com

# Google Search Console Verification (опціонально, але рекомендовано)
# NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

3. Запустіть dev сервер:

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Налаштування Firebase

1. Створіть проєкт у Firebase Console
2. Увімкніть Firestore Database
3. Створіть колекцію `reviews` з такими полями:
   - `name` (string)
   - `text` (string)
   - `rating` (number)
   - `date` (timestamp)
   - `approved` (boolean)

## Структура проєкту

```
/app              - Next.js App Router сторінки
/components       - React компоненти
/lib             - Утиліти та конфігурація
/public          - Статичні файли (зображення, відео)
```

## Керування контентом (Keystatic)

Статті блогу та екскурсії редагуються через панель керування **Keystatic** за адресою `/keystatic`
(наприклад, `https://krasitskatours.com/keystatic`). Код для цього чіпати не потрібно.

- **Блог** — заголовок, опис для Google, дата, головне фото та текст статті з форматуванням і фото.
  Час читання рахується автоматично, статті в блозі показуються від новіших до старіших.
- **Екскурсії** — назва, опис, тривалість, ціна, фото, мови, теги. Порядок у списку задає поле «Порядок у списку».
- **Реклама та аналітика** — Meta Pixel, TikTok Pixel, Google Tag та GTM: достатньо вставити ID, скрипти підключаються на всіх сторінках автоматично. Якщо Google Tag / GTM порожні, використовуються `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID`.

На живому сайті кожне збереження записується в GitHub, після чого Vercel сам перезбирає сайт (зазвичай 1–3 хвилини).

Контент зберігається у файлах:

```
content/blog/*.mdoc          - статті (дані + текст)
content/tours/*.yaml         - екскурсії
content/settings/marketing.yaml - ID пікселів
public/images/blog/<slug>/   - фото статей
public/images/tours/<slug>/  - фото екскурсій
```

### Локально

`npm run dev` → [http://localhost:3000/keystatic](http://localhost:3000/keystatic). Локально зміни пишуться просто у файли на диску.

### Живий сайт: Keystatic Cloud (одноразове налаштування)

Keystatic Cloud дає вхід у панель керування без GitHub-акаунта (безкоштовно до 3 користувачів).

1. Увійти на [keystatic.cloud](https://keystatic.cloud), створити team і project, підключити GitHub-репозиторій сайту.
2. У Vercel → Settings → Environment Variables додати `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT=<team>/<project>` і зробити redeploy.
3. У Keystatic Cloud запросити редактора в team.

Поки змінної немає, панель керування на живому сайті працює в локальному режимі й зберігати зміни не зможе.

### Інше

- **Зображення** для решти сторінок: `public/images/`
- **Відео**: `public/videos/` (опціонально)
- **Тексти інших сторінок** (головна, контакти тощо) досі редагуються в компонентах у `components/`

## Збірка для продакшну

```bash
npm run build
npm start
```

## SEO Оптимізація

Сайт вже налаштований з базовою SEO оптимізацією:

- ✅ Мета-теги на всіх сторінках
- ✅ Структуровані дані Schema.org
- ✅ Sitemap.xml та robots.txt
- ✅ Open Graph та Twitter Cards
- ✅ Canonical URLs

**Важливо:** Після деплою обов'язково:

1. Додайте сайт до [Google Search Console](https://search.google.com/search-console)
2. Відправте sitemap: `https://krasitskatours.com/sitemap.xml`
3. Перевірте індексацію сторінок

Детальні інструкції та чеклист дивіться в [SEO_CHECKLIST.md](./SEO_CHECKLIST.md)

## Ліцензія

MIT
