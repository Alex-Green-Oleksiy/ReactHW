import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/entities/product";
import { cartReducer } from "@/features/cart";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
});
