import React from "react";
import ProductAdd from "@/components/ui/ProductAdd";
import ProductFilter from "@/components/ui/ProductFilter";
import ProductList from "@/components/ProductList";

const ProductsSection = () => (
    <section>
        <ProductAdd />
        <ProductFilter />
        <ProductList />
    </section>
);

export default ProductsSection;
