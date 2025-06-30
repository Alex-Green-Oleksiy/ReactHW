import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import ShopPage from "../pages/ShopPage/ShopPage";
import PaymentRules from "../pages/PaymentRules/PaymentRules";
import Contacts from "../pages/Contacts/Contacts";
import ProductDetails from "../pages/ShopPage/components/ProductDetails";
import frontRoutes from "./frontRoutes";

function AppRoutes() {
    return (
        <Routes>
            <Route path={frontRoutes.pages.home} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={frontRoutes.pages.shop}>
                    <Route index element={<ShopPage />} />
                    <Route path=":id" element={<ProductDetails />} />
                </Route>
                <Route
                    path={frontRoutes.pages.payment}
                    element={<PaymentRules />}
                />
                <Route
                    path={frontRoutes.pages.contacts}
                    element={<Contacts />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
