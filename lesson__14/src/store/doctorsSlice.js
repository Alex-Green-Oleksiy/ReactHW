import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchDoctors = createAsyncThunk(
    "doctors/fetchDoctors",
    async () => {
        const response = await fetch("http://localhost:3001/admin/doctors");
        return response.json();
    }
);

export const createDoctor = createAsyncThunk(
    "doctors/createDoctor",
    async (doctorData) => {
        const response = await fetch("http://localhost:3001/admin/doctors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(doctorData)
        });
        return response.json();
    }
);

export const updateDoctor = createAsyncThunk(
    "doctors/updateDoctor",
    async ({ id, doctorData }) => {
        const response = await fetch(
            `http://localhost:3001/admin/doctors/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctorData)
            }
        );
        return response.json();
    }
);

export const deleteDoctor = createAsyncThunk(
    "doctors/deleteDoctor",
    async (id) => {
        await fetch(`http://localhost:3001/admin/doctors/${id}`, {
            method: "DELETE"
        });
        return id;
    }
);

const initialState = {
    doctors: [],
    loading: false,
    error: null
};

const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch doctors
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create doctor
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.doctors.push(action.payload);
            })
            // Update doctor
            .addCase(updateDoctor.fulfilled, (state, action) => {
                const index = state.doctors.findIndex(
                    (d) => d.id === action.payload.id
                );
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
            })
            // Delete doctor
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.doctors = state.doctors.filter(
                    (d) => d.id !== action.payload
                );
            });
    }
});

export default doctorsSlice.reducer;
