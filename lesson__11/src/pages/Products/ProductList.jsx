import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredProducts } from "@/redux/slices/productsSlice";
import styles from "./ProductList.module.scss";

// Компонент для відображення списку товарів з фільтрацією
const ProductList = () => {
    const filteredItems = useSelector(selectFilteredProducts);

    return (
        <div>
            <h2 className={styles.title}>Список товарів</h2>
            <ul className={styles.list}>
                {filteredItems.length === 0 ? (
                    <li className={styles.empty}>Немає товарів</li>
                ) : (
                    filteredItems.map((item) => (
                        <li key={item.id} className={styles.item}>
                            {item.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ProductList;
