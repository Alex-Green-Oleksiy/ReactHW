import React from "react";
import { Outlet } from "react-router";
import MainMenu from "./MainMenu";

const MainLayout = () => {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column"
            }}
        >
            <header className="main-header">
                <h1>React + RTK Query додаток</h1>
                <MainMenu />
            </header>
            <main >
                <Outlet />
            </main>
            <footer
                style={{
                    background: "#282c34",
                    padding: "10px",
                    color: "white",
                    textAlign: "center"
                }}
            >
                © React RTK Query App
            </footer>
        </div>
    );
};

export default MainLayout;
