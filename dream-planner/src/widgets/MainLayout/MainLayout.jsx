import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import CircularMenu from "@/components/CircularMenu";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import { useTheme } from "@/shared/context/ThemeContext";
import styles from "@/widgets/MainLayout/ui/MainLayout.module.scss";

export default function MainLayout() {
    const { theme } = useTheme();
    const [backgroundKey, setBackgroundKey] = useState(0);

    // Примусово перерендеруємо BackgroundImage при зміні теми
    useEffect(() => {
        setBackgroundKey((prev) => prev + 1);
    }, [theme]);

    return (
        <div className={styles.layout}>
            <BackgroundImage key={backgroundKey} theme={theme} />
            <CircularMenu />
            <MobileMenu />
            <main className={styles.main}>
                <div className={styles.mainContent}>
                    <Outlet />
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerText}>
                        © 2025 Створено з ❤️ для нейтралізації ваших найкращих
                        ідей.
                    </p>
                </div>
            </footer>
        </div>
    );
}
