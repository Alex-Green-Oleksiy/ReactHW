import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TravelProvider } from "@/context/TravelContext";
import BusPage from "@/pages/BusPage";
import HotelPage from "@/pages/HotelPage";
import SummaryPage from "@/pages/SummaryPage";
import "@/styles/App.css";
import Navbar from "@/components/Navbar";

function App() {
    return (
        <TravelProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<BusPage />} />
                    <Route path="/hotels" element={<HotelPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                </Routes>
            </Router>
        </TravelProvider>
    );
}

export default App;
