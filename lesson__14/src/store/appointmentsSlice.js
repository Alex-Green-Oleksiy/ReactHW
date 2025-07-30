import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchAppointments = createAsyncThunk(
    "appointments/fetchAppointments",
    async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.date) params.append("date", filters.date);
        if (filters.patientName)
            params.append("patientName", filters.patientName);

        const url = params.toString()
            ? `http://localhost:3001/appointments?${params.toString()}`
            : "http://localhost:3001/appointments";

        const response = await fetch(url);
        return response.json();
    }
);

export const fetchAppointmentById = createAsyncThunk(
    "appointments/fetchAppointmentById",
    async (id) => {
        const response = await fetch(
            `http://localhost:3001/appointments/${id}`
        );
        return response.json();
    }
);

export const createAppointment = createAsyncThunk(
    "appointments/createAppointment",
    async (appointmentData) => {
        const response = await fetch("http://localhost:3001/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointmentData)
        });
        return response.json();
    }
);

export const updateAppointment = createAsyncThunk(
    "appointments/updateAppointment",
    async ({ id, appointmentData }) => {
        const response = await fetch(
            `http://localhost:3001/appointments/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointmentData)
            }
        );
        return response.json();
    }
);

export const deleteAppointment = createAsyncThunk(
    "appointments/deleteAppointment",
    async (id) => {
        await fetch(`http://localhost:3001/appointments/${id}`, {
            method: "DELETE"
        });
        return id;
    }
);

const initialState = {
    appointments: [],
    currentAppointment: null,
    loading: false,
    error: null
};

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        clearCurrentAppointment: (state) => {
            state.currentAppointment = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch appointments
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch appointment by ID
            .addCase(fetchAppointmentById.fulfilled, (state, action) => {
                state.currentAppointment = action.payload;
            })
            // Create appointment
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.appointments.push(action.payload);
            })
            // Update appointment
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(
                    (a) => a.id === action.payload.id
                );
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
            })
            // Delete appointment
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.appointments = state.appointments.filter(
                    (a) => a.id !== action.payload
                );
            });
    }
});

export const { clearCurrentAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
