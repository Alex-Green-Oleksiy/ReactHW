import React from "react";
import styles from "@/style/InfinitePostsPage.module.scss";

const Loader = () => (
    <div className={styles.loader} aria-label="Завантаження...">
        <div className={styles.spinner} />
    </div>
);

export default Loader;
