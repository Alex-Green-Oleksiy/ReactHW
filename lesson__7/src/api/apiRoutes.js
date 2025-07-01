export default {
    productsList: "https://miniback-msn8.onrender.com/api/products",
    addProduct: "https://miniback-msn8.onrender.com/api/products",
    getUpdateProductLink: (id) =>
        `https://miniback-msn8.onrender.com/api/products/${id}`,
    getProductById: (id) =>
        `https://miniback-msn8.onrender.com/api/products/${id}`,
    getDeleteProductLink: (id) =>
        `https://miniback-msn8.onrender.com/api/products/${id}`
};
