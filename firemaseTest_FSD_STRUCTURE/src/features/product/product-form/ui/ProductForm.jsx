import styles from './ProductForm.module.css';

export const ProductForm = ({
  title,
  onTitleChange,
  price,
  onPriceChange,
  onSubmit,
  isNew,
  isSubmitting,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.productForm}>
      <h2 className={styles.formTitle}>
        {isNew ? 'Add New' : 'Edit'} Product
      </h2>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Product Title</label>
        <input
          value={title}
          onChange={onTitleChange}
          placeholder="Enter product title..."
          className={styles.formInput}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Price</label>
        <input
          value={price}
          onChange={onPriceChange}
          placeholder="Enter price..."
          type="number"
          step="0.01"
          min="0"
          className={styles.formInput}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
        
        <a href="/products" className={styles.cancelButton}>
          Cancel
        </a>
      </div>
    </form>
  )
}
