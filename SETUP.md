# Інструкція з налаштування

## Крок 1: Встановлення залежностей

```bash
npm install
```

## Крок 2: Налаштування Firebase

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Створіть новий проєкт або використайте існуючий
3. Увімкніть **Firestore Database** (режим тестування для початку)
4. Скопіюйте конфігураційні дані з Firebase
5. Створіть файл `.env.local` у корені проєкту:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Крок 3: Налаштування Firestore

Створіть колекцію `reviews` у Firestore з такими правилами безпеки (для початку):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'text', 'rating', 'date', 'approved']);
    }
  }
}
```

**Увага:** Для продакшну налаштуйте більш безпечні правила!

## Крок 4: Додавання зображень

Додайте зображення у папку `public/images/`:
- `hero-bg.jpg` - фон для Hero секції
- `guide-photo.jpg` - фото екскурсовода
- `tour-historical.jpg` - фото для екскурсії "Історичний центр"
- `tour-legends.jpg` - фото для екскурсії "Легенди"
- `tour-coffee.jpg` - фото для екскурсії "Кавовий Львів"
- `tour-architecture.jpg` - фото для екскурсії "Архітектура"

Детальніше див. `public/images/README.md`

## Крок 5: Оновлення контактної інформації

Відредагуйте файли:
- `components/Contact.tsx` - оновіть телефон, email, соціальні мережі
- `components/Footer.tsx` - оновіть контактну інформацію
- `components/About.tsx` - оновіть біографію та інформацію про екскурсовода
- `components/Tours.tsx` - оновіть інформацію про екскурсії

## Крок 6: Оновлення Google Maps

У файлі `components/Contact.tsx` оновіть iframe з Google Maps:
1. Перейдіть на [Google Maps](https://www.google.com/maps)
2. Знайдіть вашу локацію
3. Натисніть "Поділитися" → "Вставити карту"
4. Скопіюйте src з iframe та замініть у компоненті

## Крок 7: Запуск проєкту

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Крок 8: Збірка для продакшну

```bash
npm run build
npm start
```

## Додаткові налаштування

### SEO
- Оновіть мета-теги у `app/layout.tsx`
- Оновіть `NEXT_PUBLIC_SITE_URL` у `.env.local` для правильних canonical URLs
- Додайте реальні зображення для Open Graph

### Аналітика (опціонально)
Можна додати Google Analytics або інші інструменти аналітики.

## Підтримка

Якщо виникли проблеми:
1. Перевірте, чи всі змінні середовища встановлені
2. Перевірте правила безпеки Firestore
3. Перевірте консоль браузера на наявність помилок

