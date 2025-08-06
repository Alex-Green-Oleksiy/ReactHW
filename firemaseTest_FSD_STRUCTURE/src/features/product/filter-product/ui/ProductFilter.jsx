import styles from "./ProductFilter.module.css";

export const ProductFilter = ({
    searchTerm,
    onSearchChange,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection
}) => {
    return (
        <div className={styles.filterContainer}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={styles.searchInput}
                />
                <svg
                    className={styles.searchIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <div className={styles.sortWrapper}>
                <label className={styles.sortLabel}>
                    Сортувати за:
                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="title">Назва</option>
                        <option value="price">Ціна</option>
                    </select>
                </label>
                <label className={styles.sortLabel}>
                    Порядок:
                    <select
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="asc">Зростання (A-Z/↑)</option>
                        <option value="desc">Спадання (Z-A/↓)</option>
                    </select>
                </label>
            </div>
        </div>
    );
};
