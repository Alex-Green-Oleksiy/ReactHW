import React from "react";
import styles from "@/style/PostsPage.module.scss";
import ArrowLeftIcon from "./ArrowLeftIcon";
import ArrowRightIcon from "./ArrowRightIcon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className={styles.pagination}>
        <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={styles.pageBtn}
            disabled={currentPage === 1}
        >
            <ArrowLeftIcon />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={
                    page === currentPage
                        ? `${styles.pageBtn} ${styles.active}`
                        : styles.pageBtn
                }
            >
                {page}
            </button>
        ))}
        <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
        >
            <ArrowRightIcon />
        </button>
    </div>
);

export default Pagination;
