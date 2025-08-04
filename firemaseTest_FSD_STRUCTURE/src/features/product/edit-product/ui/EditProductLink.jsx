import { Link } from "react-router";
import styles from "./EditProductLink.module.css";

export const EditProductLink = ({ productId }) => (
    <Link to={`/products/edit/${productId}`} className={styles.editLink}>
        Edit
    </Link>
);
