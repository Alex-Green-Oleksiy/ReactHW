import styles from "@/widgets/DreamListWidget/ui/Pagination.module.css";

export default function Pagination({ page, setPage, hasMore }) {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className={styles.paginationButton}
            >
                <svg
                    className={styles.paginationIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className={styles.pageInfo}>
                Сторінка <span className={styles.pageNumber}>{page}</span>
            </div>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasMore}
                className={styles.paginationButton}
            >
                <svg
                    className={styles.paginationIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}
