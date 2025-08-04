import { Link } from "react-router";
import styles from "@/pages/HomePage.module.css";
const EditIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    </svg>
);
const UserGroupIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
    </svg>
);
const PlusIcon = ({ className }) => (
    <svg
        className={className}
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
);
const StarIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
);
export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <div className={styles.hero}>
                <h1 className={styles.title}>🌟 Планувальник мрій</h1>
                <p className={styles.subtitle}>
                    Мрій, доки живий, і нехай в тебе збудеться все!!!
                </p>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <EditIcon className={styles.featureIcon} />
                        <h3 className={styles.featureTitle}>
                            Запиши свою мрію
                        </h3>
                        <p className={styles.featureText}>
                            Опиши свою мрію, ні в чому себе не обмежуй!
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <UserGroupIcon className={styles.featureIcon} />
                        <h3 className={styles.featureTitle}>Ти не один</h3>
                        <p className={styles.featureText}>
                            Запроси своїх друзів, разом з ними досягни своїх
                            мрій!
                        </p>
                    </div>
                </div>
                <div className={styles.ctaSection}>
                    <p className={styles.description}>
                        Зберись тряпка, і почни реалізовувати свої мрії!
                    </p>
                    <div className={styles.buttonGroup}>
                        <Link to="/dreams" className={styles.ctaButton}>
                            <PlusIcon className={styles.ctaButtonIcon} />
                            Переглянути мрії
                        </Link>
                        <Link
                            to="/dreams/add"
                            className={styles.secondaryButton}
                        >
                            <StarIcon className={styles.secondaryButtonIcon} />
                            Додати мрію
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
