import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Конфігурація Firebase
// Всі ці значення беруться з змінних середовища (.env файл)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Ключ API для доступу до Firebase
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Домен для авторизації
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // ID проекту в Firebase
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Бакет для файлів
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // ID для повідомлень
    appId: import.meta.env.VITE_FIREBASE_APP_ID // Унікальний ID додатку
};

// Ініціалізуємо Firebase додаток
const app = initializeApp(firebaseConfig);

// Отримуємо екземпляр Firestore (база даних)
// Використовуємо lite версію для зменшення розміру бандла
const db = getFirestore(app);

export default db;
