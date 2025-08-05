import { createRoot } from "react-dom/client";
import "@/shared/styles/index.scss";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store, router } from "@/app";
import { ThemeProvider } from "@/shared/context/ThemeContext";

// Перевірка Firebase конфігурації при запуску
if (import.meta.env.PROD) {
    const firebaseVars = [
        "VITE_FIREBASE_API_KEY",
        "VITE_FIREBASE_AUTH_DOMAIN",
        "VITE_FIREBASE_PROJECT_ID",
        "VITE_FIREBASE_STORAGE_BUCKET",
        "VITE_FIREBASE_MESSAGING_SENDER_ID",
        "VITE_FIREBASE_APP_ID"
    ];

    const missingVars = firebaseVars.filter(
        (varName) => !import.meta.env[varName]
    );

    if (missingVars.length > 0) {
        console.error("🚨 Firebase змінні середовища відсутні:", missingVars);
        console.error(
            "Переконайтеся, що змінні налаштовані в Vercel Dashboard"
        );
    } else {
        console.log("✅ Всі Firebase змінні середовища налаштовані");
    }
}

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </Provider>
);
