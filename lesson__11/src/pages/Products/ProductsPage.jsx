import React from "react";
import ProductAdd from "./ProductAdd";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

const ProductsSection = () => (
    <section>
        <ProductAdd />
        <ProductFilter />
        <ProductList />
    </section>
);

export default ProductsSection;
