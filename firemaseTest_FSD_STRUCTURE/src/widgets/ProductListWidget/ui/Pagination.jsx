import styles from './Pagination.module.css'

export default function Pagination({ page, setPage, hasMore }) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className={styles.pageButton}
      >
        ◀ Prev
      </button>
      <span className={styles.pageInfo}>Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasMore}
        className={styles.pageButton}
      >
        Next ▶
      </button>
    </div>
  )
}
