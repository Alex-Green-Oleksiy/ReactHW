import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "@/store";
import router from "@/router/index.jsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/App.css";

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
