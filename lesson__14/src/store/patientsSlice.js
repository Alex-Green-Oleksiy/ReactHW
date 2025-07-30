import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchPatients = createAsyncThunk(
    "patients/fetchPatients",
    async (searchTerm = "") => {
        const url = searchTerm
            ? `http://localhost:3001/patients?search=${encodeURIComponent(
                  searchTerm
              )}`
            : "http://localhost:3001/patients";
        const response = await fetch(url);
        return response.json();
    }
);

export const fetchPatientById = createAsyncThunk(
    "patients/fetchPatientById",
    async (id) => {
        const response = await fetch(`http://localhost:3001/patients/${id}`);
        return response.json();
    }
);

export const createPatient = createAsyncThunk(
    "patients/createPatient",
    async (patientData) => {
        const response = await fetch("http://localhost:3001/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        });
        return response.json();
    }
);

export const updatePatient = createAsyncThunk(
    "patients/updatePatient",
    async ({ id, patientData }) => {
        const response = await fetch(`http://localhost:3001/patients/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        });
        return response.json();
    }
);

export const deletePatient = createAsyncThunk(
    "patients/deletePatient",
    async (id) => {
        await fetch(`http://localhost:3001/patients/${id}`, {
            method: "DELETE"
        });
        return id;
    }
);

const initialState = {
    patients: [],
    currentPatient: null,
    loading: false,
    error: null
};

const patientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        clearCurrentPatient: (state) => {
            state.currentPatient = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch patients
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch patient by ID
            .addCase(fetchPatientById.fulfilled, (state, action) => {
                state.currentPatient = action.payload;
            })
            // Create patient
            .addCase(createPatient.fulfilled, (state, action) => {
                state.patients.push(action.payload);
            })
            // Update patient
            .addCase(updatePatient.fulfilled, (state, action) => {
                const index = state.patients.findIndex(
                    (p) => p.id === action.payload.id
                );
                if (index !== -1) {
                    state.patients[index] = action.payload;
                }
            })
            // Delete patient
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.patients = state.patients.filter(
                    (p) => p.id !== action.payload
                );
            });
    }
});

export const { clearCurrentPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
