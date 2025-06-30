import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRoutes from "../../../api/apiRoutes";
import styles from "../ShopPage.module.css";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await fetch(apiRoutes.getProductById(id));
                if (!response.ok) {
                    throw new Error("Товар не знайдено");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(true);
                console.error("Помилка завантаження товару:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className={styles.wave} />
                    ))}
                </div>
                <span className={styles.loadingText}>Завантаження...</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={styles.card}>
                <h2 className={styles.title}>Товар не знайдено</h2>
                <button
                    onClick={() => navigate("/shop")}
                    className={styles.productCardBtn}
                >
                    Повернутися до магазину
                </button>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div
                style={{
                    display: "flex",
                    gap: "32px",
                    alignItems: "flex-start"
                }}
            >
                {product.imageUrl && (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                            width: "400px",
                            height: "400px",
                            objectFit: "contain",
                            borderRadius: "12px",
                            background: "#f8fafc",
                            padding: "16px"
                        }}
                    />
                )}
                <div style={{ flex: 1 }}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            color: "#059669",
                            marginBottom: "24px"
                        }}
                    >
                        {product.price} грн
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>
                            Опис товару:
                        </h3>
                        <p style={{ lineHeight: "1.6", color: "#6b7280" }}>
                            Це якісний товар з найкращими характеристиками.
                            Ідеально підходить для повсякденного використання.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button
                            className={styles.productCardBtn}
                            style={{ flex: 1 }}
                        >
                            Купити зараз
                        </button>
                        <button
                            onClick={() => navigate("/shop")}
                            style={{
                                padding: "12px 24px",
                                border: "2px solid #2563eb",
                                background: "transparent",
                                color: "#2563eb",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            Назад до магазину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
