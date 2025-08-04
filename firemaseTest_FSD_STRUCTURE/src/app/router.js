import { createBrowserRouter } from "react-router";
import { MainLayout } from "../widgets";
import {
    HomePage,
    ProductsPage,
    ProductEditPage,
    CartPage,
    PageNotFound
} from "../pages";

export const routes = [
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage,
                meta: {
                    label: "Home"
                }
            },
            {
                path: "products",
                Component: ProductsPage,
                meta: {
                    label: "Products"
                }
            },
            { path: "/products/add", Component: ProductEditPage },
            { path: "/products/edit/:id", Component: ProductEditPage },
            {
                path: "cart",
                Component: CartPage,
                meta: {
                    label: "Cart"
                }
            },
            { path: "*", Component: PageNotFound }
        ]
    }
];

export const router = createBrowserRouter(routes);
