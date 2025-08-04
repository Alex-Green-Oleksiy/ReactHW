import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import DbOperations from './api/DbOperations'

const db = new DbOperations('products')

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Весь список продуктів
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const data = await db.getAll()
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['Product'],
    }),
    // З пагінацією
    getProducts: builder.query({
      async queryFn({ page = 1, perPage = 6, cursors = [] }) {
        try {
          const { data, cursor, hasMore } = await db.getAllPaginated({
            page,
            perPage,
            cursors,
          })
          return { data: { data, cursor, hasMore } }
        } catch (error) {
          return { error: { status: 500, message: error.message } }
        }
      },
      providesTags: ['Product'],
    }),

    getProductById: builder.query({
      async queryFn(id) {
        try {
          const data = await db.getById(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
    }),

    addProduct: builder.mutation({
      async queryFn(product) {
        try {
          await db.add(product)
          return { data: true }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await db.update(id, data)
          return { data: true }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          await db.delete(id)
          return { data: true }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
