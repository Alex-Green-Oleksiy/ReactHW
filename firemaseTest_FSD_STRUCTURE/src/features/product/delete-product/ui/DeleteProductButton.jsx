import { useDeleteProduct } from "@/features/product/delete-product/model/useDeleteProduct";
import styles from "./DeleteProductButton.module.css";

export const DeleteProductButton = ({ productId, className, onDeleted }) => {
    const { handleDeleteProduct, isLoading } = useDeleteProduct();

    const handleClick = async () => {
        const success = await handleDeleteProduct(productId);
        if (success && onDeleted) {
            onDeleted(productId);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`${styles.deleteButton} ${className || ""}`}
        >
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};
