# 🚀 Інструкції для деплою

## Деплой на Vercel (Рекомендовано)

### 1. Підготовка

1. Переконайтеся, що всі зміни закомічені в Git
2. Створіть репозиторій на GitHub/GitLab
3. Завантажте код в репозиторій

### 2. Налаштування Vercel

1. Зайдіть на [vercel.com](https://vercel.com)
2. Створіть новий проект
3. Підключіть ваш репозиторій
4. В налаштуваннях проекту додайте змінні середовища:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Деплой

Vercel автоматично збудує та розгорне ваш проект при кожному пуші в main гілку.

## Деплой на Firebase Hosting

### 1. Встановлення Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Авторизація

```bash
firebase login
```

### 3. Ініціалізація проекту

```bash
firebase init
```

Виберіть:
- Hosting
- Use an existing project
- Виберіть ваш Firebase проект
- Public directory: `dist`
- Configure as single-page app: `Yes`
- Don't overwrite index.html: `No`

### 4. Деплой

```bash
npm run deploy:firebase
```

## Деплой на Netlify

### 1. Підготовка

1. Створіть файл `netlify.toml` в корені проекту:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Налаштування

1. Зайдіть на [netlify.com](https://netlify.com)
2. Створіть новий сайт з Git
3. Додайте змінні середовища в налаштуваннях

### 3. Деплой

Netlify автоматично збудує та розгорне проект.

## Перевірка після деплою

1. Перевірте, чи завантажується головна сторінка
2. Перевірте, чи працює Firebase підключення
3. Перевірте, чи працює додавання/редагування мрій
4. Перевірте, чи працює пошук та пагінація
5. Перевірте адаптивність на різних пристроях

## Troubleshooting

### Помилка з Firebase

Якщо виникають помилки з Firebase:
1. Перевірте, чи правильно налаштовані змінні середовища
2. Перевірте, чи включені потрібні сервіси в Firebase Console
3. Перевірте правила безпеки Firestore

### Помилка з роутингом

Якщо не працюють внутрішні сторінки:
1. Перевірте налаштування rewrites в `vercel.json` або `firebase.json`
2. Переконайтеся, що всі маршрути правильно налаштовані

### Проблема з оновленням сторінки (404 при F5)

**Проблема:** При оновленні сторінки (F5) або прямому переході за URL виникає 404 помилка.

**Рішення:**

**Для Vercel:**
- Файл `vercel.json` вже налаштований правильно з rewrites
- Переконайтеся, що всі маршрути включені в redirects

**Для Netlify:**
- Файл `netlify.toml` налаштований правильно
- Файл `public/_redirects` додає додаткову підтримку
- Файл `public/_headers` додає заголовки безпеки

**Для Firebase:**
- Перевірте, чи в `firebase.json` є правильні rewrites:
```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Загальні рекомендації:**
1. Завжди використовуйте `Link` або `NavLink` для навігації
2. Не використовуйте `window.location` для переходів
3. Переконайтеся, що всі файли конфігурації присутні в репозиторії

### Проблеми з збіркою

Якщо виникають помилки збірки:
1. Перевірте, чи всі залежності встановлені
2. Перевірте, чи немає помилок в коді
3. Спробуйте очистити кеш: `npm run build -- --force` 