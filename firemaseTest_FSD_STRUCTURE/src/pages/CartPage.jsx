import { useSelector, useDispatch } from "react-redux";
import {
    clearCart,
    increaseCount,
    decreaseCount,
    removeFromCart
} from "@/features/cart";
import { useState } from "react";
import styles from "./CartPage.module.css";

export default function CartPage() {
    const cart = useSelector((s) => s.cart);
    const dispatch = useDispatch();
    const [ordered, setOrdered] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

    const handleOrder = () => {
        setOrdered(true);
        setTimeout(() => {
            dispatch(clearCart());
            setOrdered(false);
        }, 2000);
    };

    const handleIncrease = (id) => {
        dispatch(increaseCount(id));
    };
    const handleDecrease = (id) => {
        dispatch(decreaseCount(id));
    };
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className={styles.cartPage}>
            <div className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>🛒 Your Shopping Cart</h2>
                <p className={styles.cartSubtitle}>
                    Review your items and complete your purchase
                </p>
            </div>

            {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                    <div className={styles.emptyCartIcon}>🛍️</div>
                    <h3 className={styles.emptyCartMessage}>
                        Your cart is empty
                    </h3>
                    <p className={styles.emptyCartMessage}>
                        Add some products to get started!
                    </p>
                    <a href="/products" className={styles.browseButton}>
                        Browse Products
                    </a>
                </div>
            ) : (
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemTitle}>
                                    {item.title}
                                </h3>
                                <p className={styles.itemPrice}>
                                    Quantity: {item.count}
                                </p>
                            </div>
                            <div className={styles.itemActions}>
                                <div className={styles.quantityControl}>
                                    <button
                                        className={styles.quantityButton}
                                        onClick={() => handleDecrease(item.id)}
                                        disabled={item.count <= 1}
                                    >
                                        -
                                    </button>
                                    <span className={styles.quantity}>
                                        {item.count}
                                    </span>
                                    <button
                                        className={styles.quantityButton}
                                        onClick={() => handleIncrease(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className={styles.itemPrice}>
                                    ${(item.price * item.count).toFixed(2)}
                                </div>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className={styles.cartSummary}>
                        <h3 className={styles.summaryTitle}>Order Summary</h3>
                        <div className={styles.totalPrice}>
                            Total: ${total.toFixed(2)}
                        </div>

                        <button
                            onClick={handleOrder}
                            className={styles.orderButton}
                            disabled={ordered}
                        >
                            {ordered ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                </div>
            )}

            {ordered && (
                <div className={styles.successMessage}>
                    <div className="text-center p-6">
                        <div className="text-4xl mb-2">✅</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Order placed successfully!
                        </h3>
                        <p className="text-gray-600">
                            Thank you for your purchase!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
