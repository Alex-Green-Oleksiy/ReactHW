import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/ProductsSection";
import PostsSection from "@/components/PostsSection";
import styles from "@/styles/App.module.scss";

const App = () => {
    const [page, setPage] = useState("products");

    return (
        <Provider store={store}>
            <div className={styles.container}>
                <Header page={page} setPage={setPage} />
                <main>
                    {page === "products" && <ProductsSection />}
                    {page === "posts" && <PostsSection />}
                </main>
                <Footer />
            </div>
        </Provider>
    );
};

export default App;
