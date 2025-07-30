import { Outlet } from "react-router-dom";
import Header from "@/components/navigation/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import "@/layouts/Layout.css";

const Layout = () => {
    return (
        <div className="layout">
            <Header />

            <main className="main">
                <div className="container">
                    <Breadcrumbs />
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
