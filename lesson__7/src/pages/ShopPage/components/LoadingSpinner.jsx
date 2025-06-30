import styles from "../ShopPage.module.css";

export default function LoadingSpinner() {
    return (
        <div className={styles.loadingWaveWrapper}>
            <div className={styles.loadingWave}>
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className={styles.waveDot} />
                ))}
            </div>
        </div>
    );
}
