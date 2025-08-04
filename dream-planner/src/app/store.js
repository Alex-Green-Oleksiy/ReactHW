import { configureStore } from "@reduxjs/toolkit";
import { dreamsApi } from "@/entities/dream";
export const store = configureStore({
    reducer: {
        [dreamsApi.reducerPath]: dreamsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dreamsApi.middleware)
});
