import apiClient from "@/api/apiClient";
import initialPosts from "@/data/initialPosts";
import { createAsyncThunk } from "@reduxjs/toolkit";

const postsApi = apiClient("posts", 500, initialPosts);

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ pageNumber, itemsPerPage }, { rejectWithValue }) => {
        try {
            const response = await postsApi.getPaginated(
                pageNumber,
                itemsPerPage
            );
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addPostAsync = createAsyncThunk(
    "posts/addPost",
    async (post, { rejectWithValue }) => {
        try {
            const response = await postsApi.create(post);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removePostAsync = createAsyncThunk(
    "posts/removePost",
    async (id, { rejectWithValue }) => {
        try {
            const response = await postsApi.delete(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
