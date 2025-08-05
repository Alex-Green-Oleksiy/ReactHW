# Dream Planner

Красивий додаток для планування мрій з інтеграцією Firebase.

## 🚀 Швидкий старт

### Локальна розробка

1. Клонуйте репозиторій:

```bash
git clone <your-repo-url>
cd dream-planner
```

2. Встановіть залежності:

```bash
npm install
```

3. Створіть файл `.env` на основі `env.example`:

```bash
cp env.example .env
```

4. Запустіть проект:

```bash
npm run dev
```

### Деплой на Vercel

1. Підключіть репозиторій до Vercel
2. Налаштуйте змінні середовища в Vercel Dashboard:

    - `VITE_FIREBASE_API_KEY`
    - `VITE_FIREBASE_AUTH_DOMAIN`
    - `VITE_FIREBASE_PROJECT_ID`
    - `VITE_FIREBASE_STORAGE_BUCKET`
    - `VITE_FIREBASE_MESSAGING_SENDER_ID`
    - `VITE_FIREBASE_APP_ID`

3. Деплой відбудеться автоматично

## 🔧 Вирішення проблем

### Помилка завантаження зображень

Якщо виникає помилка "Помилка завантаження зображень", це означає що:

1. **Проблема вирішена** - зображення тепер правильно імпортуються через Vite
2. Додаток має fallback - якщо зображення не завантажуються, показується кольоровий фон

### Firebase помилки

Якщо Firebase не працює:

1. Перевірте змінні середовища в Vercel Dashboard
2. Переконайтеся, що Firebase проект активний
3. Додаток має fallback режим без Firebase

## 📁 Структура проекту

```
src/
├── app/           # Основний додаток
├── assets/        # Статичні ресурси
├── components/    # React компоненти
├── entities/      # Бізнес-сутності
├── features/      # Функціональність
├── pages/         # Сторінки
├── shared/        # Спільні ресурси
└── widgets/       # Віджети
```

## 🛠 Технології

-   React 19
-   Vite
-   Firebase
-   Redux Toolkit
-   SCSS
-   React Router

## 📝 Скрипти

-   `npm run dev` - запуск в режимі розробки
-   `npm run build` - збірка для продакшену
-   `npm run preview` - перегляд збірки
-   `npm run lint` - перевірка коду

## 🔒 Безпека

-   Всі Firebase ключі мають fallback значення для розробки
-   Для продакшену обов'язково налаштуйте змінні середовища
-   Додаток працює навіть без Firebase (в режимі заглушки)
