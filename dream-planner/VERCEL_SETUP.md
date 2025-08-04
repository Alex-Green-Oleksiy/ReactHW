# Налаштування Firebase на Vercel

## Проблема

Якщо Firebase не працює після деплою на Vercel, це означає, що змінні середовища не налаштовані.

## Рішення

### 1. Створіть файл .env.local локально

```bash
cp env.example .env.local
```

### 2. Заповніть .env.local своїми Firebase даними

```env
VITE_FIREBASE_API_KEY=ваш_api_key
VITE_FIREBASE_AUTH_DOMAIN=ваш_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ваш_project_id
VITE_FIREBASE_STORAGE_BUCKET=ваш_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=ваш_messaging_sender_id
VITE_FIREBASE_APP_ID=ваш_app_id
```

### 3. Налаштуйте змінні на Vercel

#### Через Vercel Dashboard:

1. Перейдіть на [vercel.com](https://vercel.com)
2. Виберіть ваш проект
3. Перейдіть в **Settings** → **Environment Variables**
4. Додайте кожну змінну:

| Name                                | Value                          |
| ----------------------------------- | ------------------------------ |
| `VITE_FIREBASE_API_KEY`             | ваш_api_key                    |
| `VITE_FIREBASE_AUTH_DOMAIN`         | ваш_project_id.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID`          | ваш_project_id                 |
| `VITE_FIREBASE_STORAGE_BUCKET`      | ваш_project_id.appspot.com     |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ваш_messaging_sender_id        |
| `VITE_FIREBASE_APP_ID`              | ваш_app_id                     |

#### Через Vercel CLI:

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

### 4. Перезапустіть деплой

Після додавання змінних середовища:

1. Перейдіть в **Deployments**
2. Знайдіть останній деплой
3. Натисніть **Redeploy**

### 5. Перевірка

Відкрийте консоль браузера на вашому сайті. Ви повинні побачити:

```
✅ Firebase успішно ініціалізовано!
✅ Firestore підключено!
```

Якщо бачите помилки про відсутні змінні, перевірте налаштування на Vercel.

## Где знайти Firebase конфігурацію

1. Перейдіть на [Firebase Console](https://console.firebase.google.com)
2. Виберіть ваш проект
3. Перейдіть в **Project Settings** (⚙️)
4. Прокрутіть вниз до **Your apps**
5. Виберіть веб-додаток або створіть новий
6. Скопіюйте конфігурацію

## Приклад конфігурації

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBG_7ylcdh_wjOfUNNZD_Xh4lyu9fvrLHU",
    authDomain: "dream-planner-60776.firebaseapp.com",
    projectId: "dream-planner-60776",
    storageBucket: "dream-planner-60776.appspot.com",
    messagingSenderId: "529813336237",
    appId: "1:529813336237:web:a42aabea933755fde09624"
};
```

## Важливо

-   **НЕ** додавайте файл `.env` до Git
-   Змінні середовища на Vercel доступні тільки під час збірки та виконання
-   Після зміни змінних потрібно перезапустити деплой
