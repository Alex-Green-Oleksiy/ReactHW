import { Fragment } from "react";
import styles from "@/entities/dream/ui/DreamCard.module.css";
export function DreamCard({ dream, actions }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };
    return (
        <div className={styles.dreamCard}>
            <div className={styles.content}>
                <h3 className={styles.title} title={dream.description}>
                    {dream.description}
                </h3>
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <svg
                            className={styles.icon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className={styles.detailText}>
                            Цільовий рік: {dream.targetYear}
                        </span>
                    </div>
                    {dream.friend && (
                        <div className={styles.detailItem}>
                            <svg
                                className={styles.icon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className={styles.detailText}>
                                Друг: {dream.friend}
                            </span>
                        </div>
                    )}
                </div>
                <div className={styles.createdAt}>
                    Створено: {formatDate(dream.createdAt)}
                </div>
            </div>
            <div className={styles.actions}>
                {actions &&
                    actions.map((action, index) => (
                        <Fragment key={index}>{action}</Fragment>
                    ))}
            </div>
        </div>
    );
}
