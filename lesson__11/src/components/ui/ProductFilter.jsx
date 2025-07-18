import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/slices/productsSlice";
import styles from "@/styles/ProductFilter.module.scss";

const ProductFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.products.filter);

    return (
        <input
            type="text"
            placeholder="Фільтр за назвою"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className={styles.input}
        />
    );
};

export default ProductFilter;
