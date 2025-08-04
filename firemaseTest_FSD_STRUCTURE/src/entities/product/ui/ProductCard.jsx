import { Fragment } from 'react'
import styles from './ProductCard.module.css'

export function ProductCard({ product, actions }) {
  return (
    <div className={styles.card}>
      <h3
        className={styles.title}
        title={product.title}
      >
        {product.title}
      </h3>
      <p className={styles.price}>
        <span className={styles.priceValue}>${product.price}</span>
      </p>
      <div className={styles.actions}>
        {actions &&
          actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
      </div>
    </div>
  )
}
