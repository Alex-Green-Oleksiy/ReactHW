import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsPage from "@/pages/Products/ProductsPage";
import PostsPage from "@/pages/Posts/PostsPage";
import styles from "@/styles/App.module.scss";

const App = () => {
    const [page, setPage] = useState("products");

    return (
        <Provider store={store}>
            <div className={styles.container}>
                <Header page={page} setPage={setPage} />
                <main>
                    {page === "products" && <ProductsPage />}
                    {page === "posts" && <PostsPage />}
                </main>
                <Footer />
            </div>
        </Provider>
    );
};

export default App;
