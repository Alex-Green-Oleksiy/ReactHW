import { Link } from "react-router";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import styles from "@/pages/PageNotFound.module.scss";
export default function PageNotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.themeToggleContainer}>
                <ThemeToggle />
            </div>
            <div className={styles.emoji}>🌟</div>
            <h1 className={styles.title}>Сторінку не знайдено</h1>
            <p className={styles.description}>
                Схоже, що ця мрія ще не існує. Можливо, варто створити нову?
            </p>
            <Link to="/" className={styles.homeLink}>
                Повернутися на головну
            </Link>
        </div>
    );
}
