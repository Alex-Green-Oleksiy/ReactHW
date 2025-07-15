import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/index.css";
import BodyThemeManager from "@/BodyThemeManager";
import { ThemeProvider } from "@/providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <BodyThemeManager>
                <App />
            </BodyThemeManager>
        </ThemeProvider>
    </React.StrictMode>
);
