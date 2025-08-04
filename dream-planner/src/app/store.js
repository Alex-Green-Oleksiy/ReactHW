import { configureStore } from "@reduxjs/toolkit";
import { dreamsApi } from "@/entities/dream";

// Налаштування Redux store для управління станом додатку
export const store = configureStore({
    reducer: {
        // Додаємо reducer для RTK Query API
        // dreamsApi.reducerPath - це унікальний ключ для цього API
        [dreamsApi.reducerPath]: dreamsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        // Додаємо middleware для RTK Query до стандартних middleware
        // Це потрібно для кешування, автоматичного оновлення даних тощо
        getDefaultMiddleware().concat(dreamsApi.middleware)
});
