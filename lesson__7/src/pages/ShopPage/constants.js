export const API_URL = import.meta.env.VITE_API_URL || "/api/products";

export const CATEGORIES = [
    { value: "smartphone", label: "Смартфони" },
    { value: "laptop", label: "Ноутбуки" },
    { value: "monitor", label: "Монітори" },
    { value: "tv", label: "Телевізори" }
];

export const categoryMap = {
    smartphone: ["смартфон", "smartphone", "phone", "телефон"],
    laptop: ["ноутбук", "laptop", "macbook", "ноут"],
    monitor: ["монітор", "monitor"],
    tv: ["телевізор", "tv", "телевізор"]
};
