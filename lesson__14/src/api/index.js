// експорт всіх API функцій
export { apiSlice } from "./apiSlice";
export { apiRoutes } from "./apiRoutes";

// експорт хуків для зручності
export {
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
} from "./apiSlice";
