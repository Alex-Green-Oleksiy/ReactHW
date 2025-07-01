import styles from "../../styles/ShopPage.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.productCard}>
                <h1 className={styles.title}>Головна сторінка</h1>
                <ul className={styles.list}>
                    <li>Сучасний магазин електроніки</li>
                    <li>Зручна навігація</li>
                    <li>Актуальні ціни</li>
                </ul>
            </div>
        </div>
    );
}
