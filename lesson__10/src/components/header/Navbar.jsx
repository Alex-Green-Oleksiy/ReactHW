import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import styles from "./Navbar.module.css";

// Глобальний компонент навігації
const Navbar = () => (
    <nav className={styles.navbar}>
        <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
            Автобуси
        </NavLink>
        <NavLink
            to="/hotels"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
            Готелі
        </NavLink>
        <NavLink
            to="/summary"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
            Підсумок
        </NavLink>
        <ThemeSwitcher />
    </nav>
);

export default Navbar;
