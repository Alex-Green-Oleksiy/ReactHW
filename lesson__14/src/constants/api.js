// конфігурація API
export const API_CONFIG = {
    BASE_URL: "https://backend-t5q7.onrender.com",
    TIMEOUT: 10000
};

// ендпоінти API (застарілі - використовуйте apiRoutes з src/api/apiRoutes.js)
export const API_ENDPOINTS = {
    PATIENTS: "/patients",
    DOCTORS: "/doctors", // виправлено з /admin/doctors
    APPOINTMENTS: "/appointments"
};

// HTTP методи
export const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

// параметри запитів
export const QUERY_PARAMS = {
    SEARCH: "search",
    PAGE: "page",
    LIMIT: "limit",
    SORT: "sort",
    ORDER: "order"
};

// стандартні заголовки API
export const DEFAULT_HEADERS = {
    "Content-Type": "application/json"
};
