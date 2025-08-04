import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

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
    console.error("❌ Відсутні змінні середовища Firebase:", missingVars);
    console.error("Переконайтеся, що всі змінні налаштовані в Vercel");
}

const firebaseConfig = {
    apiKey: requiredEnvVars.VITE_FIREBASE_API_KEY,
    authDomain: requiredEnvVars.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: requiredEnvVars.VITE_FIREBASE_PROJECT_ID,
    storageBucket: requiredEnvVars.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: requiredEnvVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: requiredEnvVars.VITE_FIREBASE_APP_ID
};
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
