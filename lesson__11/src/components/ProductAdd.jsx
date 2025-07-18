import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slices/productsSlice";
import styles from "@/styles/ProductAdd.module.scss";

// Компонент для додавання нового товару
const ProductAdd = () => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            dispatch(addProduct(value.trim()));
            setValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Назва товару"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                Додати
            </button>
        </form>
    );
};

export default ProductAdd;
