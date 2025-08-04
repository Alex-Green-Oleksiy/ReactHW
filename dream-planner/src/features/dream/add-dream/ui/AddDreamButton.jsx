import React from "react";
import { Link } from "react-router";
import styles from "@/features/dream/add-dream/ui/AddDreamButton.module.css";

export const AddDreamButton = ({ className }) => {
    return (
        <Link
            to="/dreams/add"
            className={`${styles.addButton} ${className || ""}`}
        >
            <svg
                className={styles.addButtonIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
            Додати мрію
        </Link>
    );
};
