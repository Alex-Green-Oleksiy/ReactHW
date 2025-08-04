import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/features/cart";
import { useState } from "react";

export default function CartPage() {
    const cart = useSelector((s) => s.cart);
    const dispatch = useDispatch();
    const [ordered, setOrdered] = useState(false);

    const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

    const handleOrder = () => {
        setOrdered(true);
        setTimeout(() => {
            dispatch(clearCart());
            setOrdered(false);
        }, 2000);
    };

    return (
        <div className="container">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gradient">🛒 Your Shopping Cart</h2>
                <p className="text-gray-600">Review your items and complete your purchase</p>
            </div>
            
            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛍️</div>
                    <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Add some products to get started!</p>
                    <a 
                        href="/products" 
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Browse Products
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="flex justify-between items-center p-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">Quantity: {item.count}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-600">${(item.price * item.count).toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="cart-summary">
                        <div className="flex justify-between items-center p-6">
                            <h3 className="text-2xl font-bold">Total:</h3>
                            <span className="text-3xl font-bold text-gradient">${total.toFixed(2)}</span>
                        </div>
                        
                        <div className="text-center p-6">
                            <button
                                onClick={handleOrder}
                                className="order-button"
                                disabled={ordered}
                            >
                                {ordered ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {ordered && (
                <div className="success-message">
                    <div className="text-center p-6">
                        <div className="text-4xl mb-2">✅</div>
                        <h3 className="text-xl font-semibold mb-2">Order placed successfully!</h3>
                        <p className="text-gray-600">Thank you for your purchase!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
