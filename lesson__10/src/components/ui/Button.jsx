import React from "react";
import styles from "./Button.module.css";

// Глобальна кнопка з кастомним стилем
const Button = ({ children, onClick, type = "button", ...props }) => (
    <button type={type} className={styles.button} onClick={onClick} {...props}>
        {children}
    </button>
);

export default Button;
