export const API_URL = import.meta.env.VITE_API_URL || "/api/products";

export const CATEGORIES = [
    { value: "tv", label: "Телевізори" },
    { value: "laptop", label: "Ноутбуки" },
    { value: "phone", label: "Телефони" },
    { value: "monitor", label: "Монітори" }
];

export const categoryMap = {
    tv: ["телевізор", "tv"],
    laptop: ["ноутбук", "laptop"],
    phone: ["телефон", "phone", "смартфон"],
    monitor: ["монітор", "monitor"]
};
