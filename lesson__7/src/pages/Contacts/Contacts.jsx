import styles from "./Contacts.module.css";

export default function Contacts() {
    return (
        <section>
            <div className={styles.card}>
                <h2 className={styles.title}>Контакти</h2>
                <ul className={styles.list}>
                    <li>
                        Телефон:{" "}
                        <span style={{ fontFamily: "monospace" }}>
                            +380 99 123 45 67
                        </span>
                    </li>
                    <li>
                        Email:{" "}
                        <span style={{ fontFamily: "monospace" }}>
                            freelance.shop@email.com
                        </span>
                    </li>
                </ul>
            </div>
        </section>
    );
}
