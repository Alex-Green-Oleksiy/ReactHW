import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import "@/components/ThemeToggle.css";

function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Перемкнути на ${
                theme === "light" ? "темну" : "світлу"
            } тему`}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}

export default ThemeToggle;
