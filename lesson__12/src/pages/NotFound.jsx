import React from "react";
import styles from "@/style/NotFound.module.scss";

const NotFound = () => (
    <div className={styles.notFound}>
        <h1>404</h1>
        <p>Сторінку не знайдено</p>
        <a href="/" className={styles.homeLink}>
            На головну
        </a>
    </div>
);

export default NotFound;
