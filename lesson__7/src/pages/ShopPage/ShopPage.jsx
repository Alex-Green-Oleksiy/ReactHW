import { useState, useEffect } from "react";
import styles from "../../styles/ShopPage.module.css";
import apiRoutes from "../../api/apiRoutes";
import { Link } from "react-router-dom";
import { CATEGORIES, categoryMap } from "./constants";
import LoadingSpinner from "./components/LoadingSpinner";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
        fetch(apiRoutes.productsList)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(setProducts)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => {
                  const keywords = categoryMap[selectedCategory];
                  return keywords.some(
                      (kw) =>
                          product.name &&
                          product.name.toLowerCase().includes(kw)
                  );
              });

    if (loading)
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#181818"
                }}
            >
                <LoadingSpinner />
            </div>
        );
    if (error)
        return (
            <div className={styles.noProducts}>
                Помилка завантаження товарів
            </div>
        );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Магазин електроніки</h1>
            {isMobile ? (
                <select
                    className={styles.categorySelect}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">Всі товари</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            ) : (
                <div className={styles.categoryFilter}>
                    <button
                        className={
                            styles.categoryBtn +
                            (selectedCategory === "all"
                                ? " " + styles.active
                                : "")
                        }
                        onClick={() => setSelectedCategory("all")}
                    >
                        Всі товари
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            className={
                                styles.categoryBtn +
                                (selectedCategory === cat.value
                                    ? " " + styles.active
                                    : "")
                            }
                            onClick={() => setSelectedCategory(cat.value)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}
            <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className={styles.productImage}
                            />
                        )}
                        <div className={styles.productInfo}>
                            <h3 className={styles.productTitle}>
                                {product.name}
                            </h3>
                            <p className={styles.productPrice}>
                                {product.price} грн
                            </p>
                            <Link
                                to={`/shop/${product.id}`}
                                className={styles.productCardBtn}
                            >
                                Детальніше
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className={styles.noProducts}>Товарів не знайдено</div>
            )}
        </div>
    );
}
