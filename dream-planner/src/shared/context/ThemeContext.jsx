import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Перевіряємо збережену тему або системну налаштування
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }

        // Перевіряємо системну тему
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            return "dark";
        }

        return "light";
    });

    useEffect(() => {
        // Зберігаємо тему в localStorage
        localStorage.setItem("theme", theme);

        // Встановлюємо атрибут data-theme на html елементі
        document.documentElement.setAttribute("data-theme", theme);

        // Додаємо або видаляємо клас для body
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            return newTheme;
        });
    };

    const value = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
