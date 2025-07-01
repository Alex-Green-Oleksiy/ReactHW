import styles from "../../styles/ShopPage.module.css";

export default function Contacts() {
    return (
        <div className={styles.container}>
            <div className={styles.productCard}>
                <h1 className={styles.title}>Контакти</h1>
                <ul className={styles.list}>
                    <li>Телефон: +38 (099) 123-45-67</li>
                    <li>Email: info@shop.com</li>
                    <li>Адреса: м. Київ, вул. Електроніки, 1</li>
                </ul>
            </div>
        </div>
    );
}
