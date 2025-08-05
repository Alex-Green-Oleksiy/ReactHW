import { useState, useEffect } from "react";

export const useTheme = () => {
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
        console.log("useTheme useEffect спрацював, тема:", theme);

        // Зберігаємо тему в localStorage
        localStorage.setItem("theme", theme);

        // Встановлюємо атрибут data-theme на html елементі
        document.documentElement.setAttribute("data-theme", theme);

        // CSS змінні тепер управляються компонентом BackgroundImage

        // Додаємо або видаляємо клас для body
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        console.log("toggleTheme викликано, поточна тема:", theme);
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            console.log("Нова тема буде:", newTheme);
            return newTheme;
        });
    };

    return { theme, toggleTheme };
};
