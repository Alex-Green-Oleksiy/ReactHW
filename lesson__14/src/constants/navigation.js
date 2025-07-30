// константи для навігації та маршрутів
export const NAVIGATION_LINKS = [
    { path: "/", label: "Головна" },
    { path: "/patients", label: "Пацієнти" },
    { path: "/doctors", label: "Лікарі" },
    { path: "/appointments", label: "Записи" }
];

// шляхи маршрутів для використання в компонентах
export const ROUTES = {
    HOME: "/",
    PATIENTS: "/patients",
    DOCTORS: "/doctors",
    APPOINTMENTS: "/appointments"
};

// назви для хлібних крихт
export const BREADCRUMB_MAP = {
    patients: "Пацієнти",
    doctors: "Лікарі",
    appointments: "Записи",
    dashboard: "Головна"
};

// константи для футера
export const FOOTER_QUICK_LINKS = [
    { href: "/", label: "Головна" },
    { href: "/patients", label: "Пацієнти" },
    { href: "/doctors", label: "Лікарі" },
    { href: "/appointments", label: "Записи" }
];

export const FOOTER_SUPPORT_LINKS = [
    { href: "#", label: "Довідка" },
    { href: "#", label: "Технічна підтримка" },
    { href: "#", label: "Політика конфіденційності" }
];

export const FOOTER_CONTACTS = [
    "📧 info@emr-system.com",
    "📞 +380 44 123 45 67",
    "�� Київ, Україна"
];
