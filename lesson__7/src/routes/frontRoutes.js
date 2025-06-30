export default {
    pages: {
        home: "/",
        shop: "/shop",
        payment: "/rules",
        contacts: "/contacts"
    },
    navigate: {
        products: {
            list: "/shop",
            getDetailLink: (id) => `/shop/${id}`
        }
    }
};
