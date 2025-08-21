import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page, limit }) => ({
        url: apiRoutes.posts,
        params: { page, limit },
      }),
      providesTags: ['Post'],
    }),
    getPostById: build.query({
      query: (id) => `${apiRoutes.posts}/${id}`,
      providesTags: ['Post'],
    }),
    createPost: build.mutation({
      query: (data) => ({
        url: apiRoutes.posts,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: build.mutation({
      query: ({ id, data }) => ({
        url: `${apiRoutes.posts}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `${apiRoutes.posts}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
