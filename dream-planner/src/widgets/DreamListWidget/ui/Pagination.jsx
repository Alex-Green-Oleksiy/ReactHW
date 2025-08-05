import styles from "@/widgets/DreamListWidget/ui/Pagination.module.scss";

export default function Pagination({ page, setPage, hasMore, totalPages = 1 }) {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 3) {
            // Якщо загальна кількість сторінок менша або дорівнює 3, показуємо всі
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Показуємо 3 номери: поточну сторінку та по одній з кожного боку
            if (page <= 2) {
                // Якщо поточна сторінка близько до початку
                pages.push(1, 2, 3);
                if (totalPages > 3) {
                    pages.push("...");
                    pages.push(totalPages);
                }
            } else if (page >= totalPages - 1) {
                // Якщо поточна сторінка близько до кінця
                pages.push(1);
                pages.push("...");
                pages.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Якщо поточна сторінка в середині
                pages.push(1);
                pages.push("...");
                pages.push(page - 1, page, page + 1);
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>
            {/* Кнопка "Попередня сторінка" */}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className={styles.paginationButton}
                title="Попередня сторінка"
            >
                ←
            </button>

            {/* Номери сторінок */}
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

            {/* Кнопка "Наступна сторінка" */}
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasMore}
                className={styles.paginationButton}
                title="Наступна сторінка"
            >
                →
            </button>
        </div>
    );
}
