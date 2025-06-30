import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";
import PageFade from "../components/shared/PageFade";

function Layout() {
    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                <PageFade>
                    <Outlet />
                </PageFade>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
