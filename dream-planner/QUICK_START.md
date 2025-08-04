# ⚡ Швидкий старт

## 🚀 За 5 хвилин до робочого додатку

### 1. Клонування та встановлення

```bash
git clone <your-repo-url>
cd dream-planner
npm install
```

### 2. Налаштування Firebase

1. Скопіюйте `env.example` як `.env`
2. Заповніть ваші Firebase credentials

### 3. Запуск

```bash
npm run dev
```

Готово! Додаток доступний за адресою `http://localhost:3000`

## 📦 Деплой

### Vercel (Рекомендовано)
```bash
npm run deploy:vercel
```

### Firebase
```bash
npm run deploy:firebase
```

## 🔧 Основні команди

- `npm run dev` - Запуск в режимі розробки
- `npm run build` - Збірка для продакшену
- `npm run preview` - Перегляд збірки
- `npm run lint` - Перевірка коду

## 📁 Структура проекту

```
src/
├── app/           # Конфігурація додатку
├── entities/      # Бізнес-сутності
├── features/      # Функціональність
├── pages/         # Сторінки
├── shared/        # Спільні ресурси
└── widgets/       # Складені компоненти
```

## 🎯 Основні функції

- ✅ Додавання мрій
- ✅ Редагування мрій
- ✅ Пошук по мріях
- ✅ Пагінація
- ✅ Адаптивний дизайн
- ✅ Firebase інтеграція 