export default {
    productsList: import.meta.env.VITE_API_URL || "/api/products",
    getProductById: (id) =>
        `${import.meta.env.VITE_API_URL || "/api/products"}/${id}`
};
