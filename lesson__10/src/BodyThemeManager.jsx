import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function BodyThemeManager({ children }) {
    const { theme } = useTheme();
    useEffect(() => {
        document.body.classList.remove("dark", "light");
        document.body.classList.add(theme);
        console.log("Theme applied to body:", theme);
    }, [theme]);
    return children;
}
