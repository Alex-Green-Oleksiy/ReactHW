import React from "react";
import styles from "@/styles/Header.module.scss";
import navStyles from "@/styles/Nav.module.scss";

const Header = ({ page, setPage }) => (
    <header className={styles.header}>
        <div className={styles.logo}>lesson_11</div>
        <nav className={navStyles.nav}>
            <button
                className={
                    page === "products"
                        ? navStyles.navBtn + " " + navStyles.active
                        : navStyles.navBtn
                }
                onClick={() => setPage("products")}
            >
                Товари
            </button>
            <button
                className={
                    page === "posts"
                        ? navStyles.navBtn + " " + navStyles.active
                        : navStyles.navBtn
                }
                onClick={() => setPage("posts")}
            >
                Пости
            </button>
        </nav>
    </header>
);

export default Header;
