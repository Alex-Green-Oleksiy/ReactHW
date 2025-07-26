import React from "react";
import { Outlet } from "react-router";
import MainMenu from "./MainMenu";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <header className="main-header">
                <h1>React + RTK Query додаток</h1>
                <MainMenu />
            </header>
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="main-footer">
                © React RTK Query App
            </footer>
        </div>
    );
};

export default MainLayout;
