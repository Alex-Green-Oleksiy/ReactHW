import React from "react";
import { useTheme } from "@/shared/context/ThemeContext";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const handleToggle = () => {
        toggleTheme();
    };

    return (
        <button
            className={styles.themeToggle}
            onClick={handleToggle}
            aria-label={`Перемкнути на ${
                theme === "light" ? "темну" : "світлу"
            } тему`}
        >
            {theme === "light" ? "темна" : "світла"}
        </button>
    );
};
