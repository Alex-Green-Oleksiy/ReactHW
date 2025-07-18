import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронний thunk для завантаження постів
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, thunkAPI) => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Помилка завантаження");
        return await response.json();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default postsSlice.reducer;
