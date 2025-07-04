import { Outlet } from "react-router-dom";
import Header from "@/layout/components/Header";
import Footer from "@/layout/components/Footer";
import styles from "@/styles/layout/MainLayout.module.scss";

function MainLayout() {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
