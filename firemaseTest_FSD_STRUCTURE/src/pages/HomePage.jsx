export default function HomePage() {
  return (
    <div className="container text-center">
      <div className="mb-5">
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          Welcome to Firebase Shop! 🛍️
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products with real-time Firebase integration
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="feature-card">
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-lg font-semibold mb-2">Firebase Powered</h3>
            <p className="text-gray-600">Real-time data synchronization</p>
          </div>
          <div className="feature-card">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Optimized performance</p>
          </div>
          <div className="feature-card">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
            <p className="text-gray-600">Beautiful UI/UX</p>
          </div>
        </div>
        <a 
          href="/products" 
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          Browse Products →
        </a>
      </div>
    </div>
  )
}
