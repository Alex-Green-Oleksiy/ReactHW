import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={styles.homepage}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Firebase Shop! 🛍️</h1>
                <p className={styles.subtitle}>
                    Discover amazing products with real-time Firebase
                    integration
                </p>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🔥</div>
                        <h3 className={styles.featureTitle}>
                            Firebase Powered
                        </h3>
                        <p className={styles.featureDescription}>
                            Real-time data synchronization
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚡</div>
                        <h3 className={styles.featureTitle}>Lightning Fast</h3>
                        <p className={styles.featureDescription}>
                            Optimized performance
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🎨</div>
                        <h3 className={styles.featureTitle}>Modern Design</h3>
                        <p className={styles.featureDescription}>
                            Beautiful UI/UX
                        </p>
                    </div>
                </div>
                <a href="/products" className={styles.ctaButton}>
                    Browse Products →
                </a>
            </div>
        </div>
    );
}
