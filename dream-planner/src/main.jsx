import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store, router } from "@/app";

// Точка входу в додаток
// createRoot створює кореневий елемент для React 18+
createRoot(document.getElementById("root")).render(
    // Provider обгортає весь додаток для надання доступу до Redux store
    <Provider store={store}>
        {/* RouterProvider надає роутинг для всього додатку */}
        <RouterProvider router={router} />
    </Provider>
);
