import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existing = state.find(
                (item) => item.id === action.payload.id
            );
            if (existing) existing.count += 1;
            else state.push({ ...action.payload, count: 1 });
        },
        increaseCount: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) item.count += 1;
        },
        decreaseCount: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item && item.count > 1) item.count -= 1;
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        clearCart: () => []
    }
});

export const {
    addToCart,
    clearCart,
    increaseCount,
    decreaseCount,
    removeFromCart
} = cartSlice.actions;
export default cartSlice.reducer;
