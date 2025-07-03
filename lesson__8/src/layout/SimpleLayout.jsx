import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoHomeButton from "../components/shared/GoHomeButton";
import styles from "../styles/layout/MainLayout.module.scss";

function SimpleLayout() {
    const location = useLocation();
    // Вважаємо, що 404 — це будь-який шлях, якого немає у frontRoutes
    const is404 =
        location.pathname === "*" ||
        location.pathname === "/404" ||
        location.pathname === "/page404";

    // Альтернативно: можна перевіряти через location.state чи інший спосіб, якщо 404 рендериться на будь-який невідомий шлях

    return (
        <div className={styles.layout}>
            {!is404 && <Header />}
            <main className={styles.main}>
                <Outlet />
            </main>
            {!is404 && (
                <>
                    <hr
                        style={{
                            border: "none",
                            borderTop: "1px solid #e6ded7",
                            margin: 0
                        }}
                    />
                    <GoHomeButton />
                    <Footer />
                </>
            )}
        </div>
    );
}

export default SimpleLayout;
