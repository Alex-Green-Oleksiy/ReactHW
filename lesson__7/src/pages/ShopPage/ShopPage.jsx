import { useState, useEffect } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";
import { CATEGORIES, categoryMap } from "./constants";
import apiRoutes from "../../api/apiRoutes";
import styles from "./ShopPage.module.css";

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await fetch(apiRoutes.productsList);
                if (!response.ok) {
                    throw new Error("Помилка завантаження товарів");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Помилка:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => {
                  const categoryKeywords = categoryMap[selectedCategory];
                  return categoryKeywords.some((keyword) =>
                      product.name.toLowerCase().includes(keyword.toLowerCase())
                  );
              });

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Наші товари</h1>

            <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className={styles.noProducts}>
                    <p>Товари не знайдено</p>
                </div>
            )}
        </div>
    );
}
