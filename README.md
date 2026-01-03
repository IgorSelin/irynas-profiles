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
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
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

## Додавання контенту

1. **Зображення**: Додайте фото у `public/images/`
   - `hero-bg.jpg` - фон для Hero секції
   - `guide-photo.jpg` - фото екскурсовода
   - `tour-historical.jpg`, `tour-legends.jpg`, `tour-coffee.jpg`, `tour-architecture.jpg` - фото екскурсій

2. **Відео**: Додайте відео у `public/videos/` (опціонально)

3. **Оновлення інформації**: Редагуйте компоненти у `components/` для зміни тексту, контактів та інформації про екскурсії

## Збірка для продакшну

```bash
npm run build
npm start
```

## Ліцензія

MIT

