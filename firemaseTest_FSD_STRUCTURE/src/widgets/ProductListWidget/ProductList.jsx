import { ProductCard } from '@/entities/product'
import { AddToCartButton } from '@/features/cart'
import { EditProductLink, DeleteProductButton } from '@/features/product'
import { Pagination } from './ui'
import styles from './ProductList.module.css'

export const ProductList = ({
  products,
  page,
  setPage,
  hasMore,
  isLoading,
}) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <p className={styles.loadingText}>
            Loading products...
          </p>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {products.length === 0 ? (
            <p className={styles.noProducts}>
              No products found.
            </p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                actions={[
                  <EditProductLink
                    productId={product.id}
                    key={`edit-${product.id}`}
                  />,
                  <DeleteProductButton
                    productId={product.id}
                    key={`delete-${product.id}`}
                  />,
                  <AddToCartButton
                    product={product}
                    key={`add-to-cart-${product.id}`}
                  />,
                ]}
              />
            ))
          )}
        </div>
      )}

      <div className={styles.paginationContainer}>
        <Pagination page={page} setPage={setPage} hasMore={hasMore} />
      </div>
    </div>
  )
}
