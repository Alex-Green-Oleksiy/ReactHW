import styles from "./PaymentRules.module.css";

export default function PaymentRules() {
    return (
        <section>
            <div className={styles.card}>
                <h2 className={styles.title}>Правила оплати</h2>
                <ul className={styles.list}>
                    <li>Оплата на карту або післяплата</li>
                    <li>Повернення товару протягом 14 днів</li>
                </ul>
            </div>
        </section>
    );
}
