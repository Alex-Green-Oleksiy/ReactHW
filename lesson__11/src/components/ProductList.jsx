import React from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/ProductList.module.scss";

// Компонент для відображення списку товарів з фільтрацією
const ProductList = () => {
    const items = useSelector((state) => state.products.items);
    const filter = useSelector((state) => state.products.filter);

    // Фільтрація товарів за назвою
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

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
