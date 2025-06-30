import styles from "./Home.module.css";

export default function Home() {
    return (
        <section>
            <div className={styles.card}>
                <h2 className={styles.title}>
                    Цей магазин належить програмісту на фрілансі
                </h2>
                <ul className={styles.list}>
                    <li>Магазин працює коли хоче</li>
                    <li>Товари надсилає швидко</li>
                    <li>На запитання відповідає коли виспиться.</li>
                </ul>
            </div>
        </section>
    );
}
