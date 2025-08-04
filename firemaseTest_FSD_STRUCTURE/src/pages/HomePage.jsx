import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={styles.homepage}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Shop! 🛍️</h1>
                
                
                <a href="/products" className={styles.ctaButton}>
                    Browse Products →
                </a>
            </div>
        </div>
    );
}
