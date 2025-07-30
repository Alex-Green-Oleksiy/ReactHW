// ендпоінти API для всіх ресурсів
export const apiRoutes = {
    patients: {
        base: "/patients",
        getAll: "/patients",
        getById: (id) => `/patients/${id}`,
        create: "/patients",
        update: (id) => `/patients/${id}`,
        delete: (id) => `/patients/${id}`,
        search: (searchTerm) =>
            `/patients?search=${encodeURIComponent(searchTerm)}`
    },

    doctors: {
        base: "/doctors",
        getAll: "/doctors",
        getById: (id) => `/doctors/${id}`,
        create: "/doctors",
        update: (id) => `/doctors/${id}`,
        delete: (id) => `/doctors/${id}`
    },

    appointments: {
        base: "/appointments",
        getAll: "/appointments",
        getById: (id) => `/appointments/${id}`,
        create: "/appointments",
        update: (id) => `/appointments/${id}`,
        delete: (id) => `/appointments/${id}`,
        filterByDate: (date) =>
            `/appointments?date=${encodeURIComponent(date)}`,
        filterByPatientName: (name) =>
            `/appointments?patientName=${encodeURIComponent(name)}`,
        filterByMultiple: (filters) => {
            const params = new URLSearchParams();
            if (filters.date) params.append("date", filters.date);
            if (filters.patientName)
                params.append("patientName", filters.patientName);
            return params.toString()
                ? `/appointments?${params.toString()}`
                : "/appointments";
        }
    }
};
