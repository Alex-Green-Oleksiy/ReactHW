import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, removePostAsync } from "@/store/postsThunks";

const initialState = {
    postsList: [],
    currentPageNumber: 1,
    postsNumberPerPage: 4,
    totalPagesNumber: 1,
    status: "idle",
    error: null
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPageNumber = action.payload;
        },
        setPostsNumberPerPage: (state, action) => {
            state.postsNumberPerPage = action.payload;
        },
        addPost: (state, action) => {
            state.postsList.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.postsList = state.postsList.filter(
                (post) => post.id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "success";
                state.postsList = action.payload.items;
                const paginationData = action.payload.pagination;
                state.currentPageNumber = paginationData.currentPage;
                state.postsNumberPerPage = paginationData.pageSize;
                state.totalPagesNumber = paginationData.totalPages;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(removePostAsync.fulfilled, (state, action) => {
                state.postsList = state.postsList.filter(
                    (post) => post.id !== action.meta.arg
                );
            });
    }
});

export const { setCurrentPage, setPostsNumberPerPage, addPost, removePost } =
    postsSlice.actions;

export default postsSlice.reducer;
