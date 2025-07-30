import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiRoutes } from "./apiRoutes";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://backend-t5q7.onrender.com/",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["Patients", "Doctors", "Appointments"],
    endpoints: (builder) => ({
        // ендпоінти для пацієнтів
        getPatients: builder.query({
            query: (searchTerm = "") =>
                searchTerm
                    ? apiRoutes.patients.search(searchTerm)
                    : apiRoutes.patients.getAll,
            providesTags: ["Patients"]
        }),
        getPatientById: builder.query({
            query: (id) => apiRoutes.patients.getById(id),
            providesTags: (result, error, id) => [{ type: "Patients", id }]
        }),
        createPatient: builder.mutation({
            query: (patient) => ({
                url: apiRoutes.patients.create,
                method: "POST",
                body: patient
            }),
            invalidatesTags: ["Patients"]
        }),
        updatePatient: builder.mutation({
            query: ({ id, ...patient }) => ({
                url: apiRoutes.patients.update(id),
                method: "PUT",
                body: patient
            }),
            invalidatesTags: (result, error, { id }) => [
                "Patients",
                { type: "Patients", id }
            ]
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: apiRoutes.patients.delete(id),
                method: "DELETE"
            }),
            invalidatesTags: ["Patients"]
        }),

        // ендпоінти для лікарів
        getDoctors: builder.query({
            query: () => apiRoutes.doctors.getAll,
            providesTags: ["Doctors"]
        }),
        getDoctorById: builder.query({
            query: (id) => apiRoutes.doctors.getById(id),
            providesTags: (result, error, id) => [{ type: "Doctors", id }]
        }),
        createDoctor: builder.mutation({
            query: (doctor) => ({
                url: apiRoutes.doctors.create,
                method: "POST",
                body: doctor
            }),
            invalidatesTags: ["Doctors"]
        }),
        updateDoctor: builder.mutation({
            query: ({ id, ...doctor }) => ({
                url: apiRoutes.doctors.update(id),
                method: "PUT",
                body: doctor
            }),
            invalidatesTags: (result, error, { id }) => [
                "Doctors",
                { type: "Doctors", id }
            ]
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: apiRoutes.doctors.delete(id),
                method: "DELETE"
            }),
            invalidatesTags: ["Doctors"]
        }),

        // ендпоінти для записів
        getAppointments: builder.query({
            query: (filters = {}) =>
                apiRoutes.appointments.filterByMultiple(filters),
            providesTags: ["Appointments"]
        }),
        getAppointmentById: builder.query({
            query: (id) => apiRoutes.appointments.getById(id),
            providesTags: (result, error, id) => [{ type: "Appointments", id }]
        }),
        createAppointment: builder.mutation({
            query: (appointment) => ({
                url: apiRoutes.appointments.create,
                method: "POST",
                body: appointment
            }),
            invalidatesTags: ["Appointments"]
        }),
        updateAppointment: builder.mutation({
            query: ({ id, ...appointment }) => ({
                url: apiRoutes.appointments.update(id),
                method: "PUT",
                body: appointment
            }),
            invalidatesTags: (result, error, { id }) => [
                "Appointments",
                { type: "Appointments", id }
            ]
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: apiRoutes.appointments.delete(id),
                method: "DELETE"
            }),
            invalidatesTags: ["Appointments"]
        })
    })
});

export const {
    // хуки для пацієнтів
    useGetPatientsQuery,
    useGetPatientByIdQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,

    // хуки для лікарів
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,

    // хуки для записів
    useGetAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation
} = apiSlice;
