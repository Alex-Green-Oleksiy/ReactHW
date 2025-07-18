import React from "react";
import styles from "@/styles/Footer.module.scss";

const Footer = () => (
    <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}. Всі права захищені.
    </footer>
);

export default Footer;
