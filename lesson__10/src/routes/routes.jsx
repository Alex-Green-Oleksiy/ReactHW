import React from "react";
import { Routes, Route } from "react-router-dom";
import BusPage from "@/pages/BusPage";
import HotelPage from "@/pages/HotelPage";
import SummaryPage from "@/pages/SummaryPage";
import Result from "@/pages/Result";
import ErrorPage from "@/pages/ErrorPage";
import Page404 from "@/pages/Page404";

// Головний компонент маршрутизації
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<BusPage />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Page404 />} />
    </Routes>
);

export default AppRoutes;
