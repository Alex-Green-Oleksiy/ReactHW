import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Firebase конфігурація з fallback на змінні середовища
const firebaseConfig = {
    apiKey:
        import.meta.env.VITE_FIREBASE_API_KEY ||
        "AIzaSyBG_7ylcdh_wjOfUNNZD_Xh4lyu9fvrLHU",
    authDomain:
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
        "dream-planner-60776.firebaseapp.com",
    projectId:
        import.meta.env.VITE_FIREBASE_PROJECT_ID || "dream-planner-60776",
    storageBucket:
        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
        "dream-planner-60776.firebasestorage.app",
    messagingSenderId:
        import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "529813336237",
    appId:
        import.meta.env.VITE_FIREBASE_APP_ID ||
        "1:529813336237:web:a42aabea933755fde09624"
};

// Перевірка наявності змінних середовища
const requiredEnvVars = {
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env
        .VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID
};

// Перевірка відсутніх змінних
const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.warn(
        "⚠️ Використовуються fallback значення Firebase. Відсутні змінні середовища:",
        missingVars
    );
    console.info(
        "💡 Для продакшну налаштуйте змінні середовища в Vercel Dashboard"
    );
} else {
    console.log("✅ Всі Firebase змінні середовища налаштовані");
}
if (import.meta.env.DEV) {
    console.log("Firebase Config:", {
        apiKey: firebaseConfig.apiKey ? "✅ Завантажено" : "❌ Відсутній",
        authDomain: firebaseConfig.authDomain
            ? "✅ Завантажено"
            : "❌ Відсутній",
        projectId: firebaseConfig.projectId ? "✅ Завантажено" : "❌ Відсутній",
        storageBucket: firebaseConfig.storageBucket
            ? "✅ Завантажено"
            : "❌ Відсутній",
        messagingSenderId: firebaseConfig.messagingSenderId
            ? "✅ Завантажено"
            : "❌ Відсутній",
        appId: firebaseConfig.appId ? "✅ Завантажено" : "❌ Відсутній"
    });
}
let app;
let db;

try {
    // Перевіряємо, чи всі необхідні змінні присутні
    if (missingVars.length === 0) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);

        if (import.meta.env.DEV) {
            console.log("✅ Firebase успішно ініціалізовано!");
            console.log("✅ Firestore підключено!");
        }
    } else {
        console.error(
            "❌ Firebase не ініціалізовано через відсутні змінні середовища"
        );
        // Створюємо заглушку для db
        db = {
            collection: () => ({
                add: () => Promise.reject(new Error("Firebase не налаштовано")),
                get: () => Promise.reject(new Error("Firebase не налаштовано")),
                doc: () => ({
                    get: () =>
                        Promise.reject(new Error("Firebase не налаштовано")),
                    set: () =>
                        Promise.reject(new Error("Firebase не налаштовано")),
                    update: () =>
                        Promise.reject(new Error("Firebase не налаштовано")),
                    delete: () =>
                        Promise.reject(new Error("Firebase не налаштовано"))
                })
            })
        };
    }
} catch (error) {
    console.error("❌ Помилка ініціалізації Firebase:", error);
    // Створюємо заглушку для db
    db = {
        collection: () => ({
            add: () => Promise.reject(new Error("Firebase не налаштовано")),
            get: () => Promise.reject(new Error("Firebase не налаштовано")),
            doc: () => ({
                get: () => Promise.reject(new Error("Firebase не налаштовано")),
                set: () => Promise.reject(new Error("Firebase не налаштовано")),
                update: () =>
                    Promise.reject(new Error("Firebase не налаштовано")),
                delete: () =>
                    Promise.reject(new Error("Firebase не налаштовано"))
            })
        })
    };
}

export default db;
