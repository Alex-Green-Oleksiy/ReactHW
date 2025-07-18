import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/redux/slices/productsSlice";
import postsReducer from "@/redux/slices/postsSlice";

// Створення store з двома слайсами
const store = configureStore({
    reducer: {
        products: productsReducer,
        posts: postsReducer
    }
});

export default store;
