import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
    items: [
        { id: 1, name: "Молоко" },
        { id: 2, name: "Хліб" },
        { id: 3, name: "Яблуко" },
        { id: 4, name: "Кава" },
        { id: 5, name: "Сир" },
        { id: 6, name: "Банан" },
        { id: 7, name: "Печиво" },
        { id: 8, name: "Гречка" },
        { id: 9, name: "Масло" },
        { id: 10, name: "Кефір" }
    ],
    filter: ""
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            // Додаємо новий товар
            state.items.push({
                id: Date.now(),
                name: action.payload
            });
        },
        setFilter: (state, action) => {
            // Встановлюємо фільтр
            state.filter = action.payload;
        }
    }
});

export const { addProduct, setFilter } = productsSlice.actions;

// Селектори
const selectProducts = (state) => state.products.items;
const selectFilter = (state) => state.products.filter;

export const selectFilteredProducts = createSelector(
    [selectProducts, selectFilter],
    (items, filter) =>
        items.filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        )
);

export default productsSlice.reducer;
