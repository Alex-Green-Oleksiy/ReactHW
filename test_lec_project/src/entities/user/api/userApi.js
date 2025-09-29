import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ page, limit }) => ({
        url: apiRoutes.users,
        params: { page, limit },
      }),
      providesTags: ['User'],
    }),
    getUserById: build.query({
      query: (id) => `${apiRoutes.users}/${id}`,
      providesTags: ['User'],
    }),
    getProfile: build.query({
      query: () => apiRoutes.profile,
      providesTags: ['User'],
    }),
    createUser: build.mutation({
      query: (userData) => ({
        url: apiRoutes.users,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `${apiRoutes.users}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${apiRoutes.users}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useGetProfileQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation 
} = userApi
