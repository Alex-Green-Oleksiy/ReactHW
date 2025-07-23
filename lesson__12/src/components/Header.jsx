import React from "react";
import { NavLink } from "react-router-dom";
import styles from "@/style/App.module.scss";

const Header = () => (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/posts"
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                }
            >
                Posts
            </NavLink>
            <NavLink
                to="/infinite-posts"
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                }
            >
                Infinite Scroll
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                }
            >
                About
            </NavLink>
        </nav>
    </header>
);

export default Header;
