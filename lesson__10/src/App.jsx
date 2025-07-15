import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TravelProvider } from "@/providers/TravelProvider";
import AppRoutes from "@/routes/routes";
import "@/styles/App.css";
import Navbar from "@/components/header/Navbar";

function App() {
    return (
        <TravelProvider>
            <Router>
                <Navbar />
                <AppRoutes />
            </Router>
        </TravelProvider>
    );
}

export default App;
