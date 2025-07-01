import styles from "../../styles/ShopPage.module.css";

export default function PaymentRules() {
    return (
        <div className={styles.container}>
            <div className={styles.productCard}>
                <h1 className={styles.title}>Правила оплати</h1>
                <ul className={styles.list}>
                    <li>Оплата онлайн банківською картою</li>
                    <li>Готівкою при отриманні</li>
                    <li>Безготівковий розрахунок для юр. осіб</li>
                </ul>
            </div>
        </div>
    );
}
