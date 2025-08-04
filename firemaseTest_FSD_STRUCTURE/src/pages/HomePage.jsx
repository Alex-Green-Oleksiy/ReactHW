export default function HomePage() {
    return (
        <div className="container text-center">
            <div className="mb-5">
                <h1 className="text-4xl font-bold mb-4 text-gradient">
                    Welcome to Firebase Shop! 🛍️
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Discover amazing products with real-time Firebase
                    integration
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"></div>
                <a href="/products" className="browse-products-link">
                    Browse Products →
                </a>
            </div>
        </div>
    );
}
