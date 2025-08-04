import styles from './ProductFilter.module.css'

export const ProductFilter = ({ searchTerm, onSearchChange }) => {
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
    </div>
  )
} 