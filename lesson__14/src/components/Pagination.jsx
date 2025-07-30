import "@/components/Pagination.css";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    startItem,
    endItem,
    itemType = "пацієнтів"
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        // якщо сторінок мало - показую всі
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // якщо ми на початку - показую перші 4 + останню
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // якщо ми в кінці - показую першу + останні 4
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // якщо ми в середині - показую першу + поточну + останню
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            <div className="pagination-info">
                Показано {startItem + 1}-{Math.min(endItem, totalItems)} з{" "}
                {totalItems} {itemType}
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Попередня сторінка"
                >
                    ←
                </button>

                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        className={`pagination-btn ${
                            page === currentPage ? "active" : ""
                        } ${page === "..." ? "dots" : ""}`}
                        onClick={() => page !== "..." && onPageChange(page)}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Наступна сторінка"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Pagination;
