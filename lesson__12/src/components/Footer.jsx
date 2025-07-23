import React from "react";
import styles from "@/style/App.module.scss";

const Footer = () => (
    <div className={styles.footer}>
        © {new Date().getFullYear()} My React Homework
    </div>
);

export default Footer;
