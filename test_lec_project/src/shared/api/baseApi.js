import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '@/features/auth/api/authSlice'
import { apiRoutes } from '../config/routes/apiRoutes'
import { frontRoutes } from '../config/routes/frontRoutes'

// Визначаємо базовий URL API:
// - якщо VITE_API_URL задано — використовуємо його
// - інакше — відносний шлях "/api/" (щоб працювало з проксі на Vercel і у Vite dev)
const apiHost = (import.meta.env.VITE_API_URL ?? '').trim()
const baseQuery = fetchBaseQuery({
  baseUrl: apiHost ? `${apiHost}/api/` : '/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken

    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Access token закінчився, пробуємо оновити
    const refreshResult = await baseQuery(
      { url: apiRoutes.auth.refresh, method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // Оновлюємо токен у state
      api.dispatch(setCredentials(refreshResult.data))
      // Повторюємо оригінальний запит з новим токеном
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Оновлення токена не вдалось — логаут
      api.dispatch(logout())
      window.location.href = frontRoutes.pages.LoginPage.navigationPath // Перенаправлення
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}),
})
