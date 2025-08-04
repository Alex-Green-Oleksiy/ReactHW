import { Outlet } from "react-router";
import CircularMenu from "@/components/CircularMenu";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import styles from "@/widgets/MainLayout/ui/MainLayout.module.css";
export default function MainLayout() {
    return (
        <div className={styles.layout}>
            <BackgroundImage />
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
                        © 2025 Створено з ❤️ для нейтралізації
                        ваших найкращих ідей.
                    </p>
                </div>
            </footer>
        </div>
    );
}
