import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiRoutes from "../../../api/apiRoutes";
import styles from "../../../styles/ShopPage.module.css";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(apiRoutes.getProductById(id))
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(setProduct)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

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
    if (error || !product)
        return <div className={styles.noProducts}>Товар не знайдено</div>;

    return (
        <div
            className={styles.productCard}
            style={{ maxWidth: 700, margin: "40px auto" }}
        >
            {product.imageUrl && (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                    style={{
                        width: 340,
                        height: 340,
                        marginBottom: 32,
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                />
            )}
            <h1
                className={styles.title}
                style={{ fontSize: 40, marginBottom: 24 }}
            >
                {product.name}
            </h1>
            <div
                className={styles.productPrice}
                style={{ fontSize: 32, marginBottom: 32 }}
            >
                {product.price} грн
            </div>
            <div
                style={{
                    textAlign: "center",
                    marginBottom: 32,
                    fontSize: 22,
                    color: "#fff"
                }}
            >
                <b>Справжній вибір для справжніх поціновувачів техніки!</b>
            </div>
            <Link
                to="/shop"
                className={styles.productCardBtn}
                style={{ maxWidth: 300, margin: "0 auto" }}
            >
                Назад до магазину
            </Link>
        </div>
    );
}
