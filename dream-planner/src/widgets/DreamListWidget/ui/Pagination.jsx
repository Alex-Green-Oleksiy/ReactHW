import styles from "@/widgets/DreamListWidget/ui/Pagination.module.css";
export default function Pagination({ page, setPage, hasMore, totalPages = 1 }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Максимальна кількість видимих сторінок
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = page - 1; i <= page + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };
    const pageNumbers = getPageNumbers();
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className={styles.paginationButton}
                title="Попередня сторінка"
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
            <div className={styles.pageNumbers}>
                {pageNumbers.map((pageNum, index) => (
                    <div key={index} className={styles.pageNumberWrapper}>
                        {pageNum === "..." ? (
                            <span className={styles.ellipsis}>...</span>
                        ) : (
                            <button
                                onClick={() => setPage(pageNum)}
                                className={`${styles.pageNumberButton} ${
                                    pageNum === page ? styles.active : ""
                                }`}
                                title={`Сторінка ${pageNum}`}
                            >
                                {pageNum}
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasMore}
                className={styles.paginationButton}
                title="Наступна сторінка"
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
