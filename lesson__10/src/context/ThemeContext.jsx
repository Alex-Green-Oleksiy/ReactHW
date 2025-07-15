import React, { createContext, useContext, useState } from "react";

// Створюємо контекст теми
const ThemeContext = createContext();

// Провайдер теми
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Кастомний хук для використання теми
export const useTheme = () => useContext(ThemeContext);
