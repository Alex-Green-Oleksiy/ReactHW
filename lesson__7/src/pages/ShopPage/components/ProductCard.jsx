import { Link } from "react-router-dom";
import styles from "../../../styles/ShopPage.module.css";

export default function ProductCard({ product }) {
    return (
        <div className={styles.productCard}>
            {product.imageUrl && (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                />
            )}
            <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price} грн</p>
                <Link
                    to={`/shop/${product.id}`}
                    className={styles.productCardBtn}
                >
                    Детальніше
                </Link>
            </div>
        </div>
    );
}
