import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: () => ({
        url: apiRoutes.comments,
      }),
      providesTags: ['Comment'],
    }),
    getCommentsByPost: build.query({
      query: ({ postId }) => ({
        url: apiRoutes.getCommentsByPostId,
        params: { postId },
      }),
      providesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    createComment: build.mutation({
      query: (data) => ({
        url: apiRoutes.comments,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'Comment', id: result.postId }],
    }),
    updateComment: build.mutation({
      query: ({ id, data }) => ({
        url: `${apiRoutes.comments}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `${apiRoutes.comments}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [{ type: 'Comment', id: result.postId }],
    }),
  }),
})

export const {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi
