import styles from "../ShopPage.module.css";

export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange
}) {
    return (
        <div className={styles.categoryFilter}>
            <button
                className={`${styles.categoryBtn} ${
                    selectedCategory === "all" ? styles.active : ""
                }`}
                onClick={() => onCategoryChange("all")}
            >
                Всі товари
            </button>
            {categories.map((category) => (
                <button
                    key={category.value}
                    className={`${styles.categoryBtn} ${
                        selectedCategory === category.value ? styles.active : ""
                    }`}
                    onClick={() => onCategoryChange(category.value)}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
