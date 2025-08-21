import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: null,

  loading: true,
  error: null,
}
import { authApi } from './authApi'

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    logout(state) {
      state.user = null
      state.accessToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchPending,
          authApi.endpoints.logout.matchPending,
          authApi.endpoints.refresh.matchPending
        ),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.refresh.matchFulfilled
        ),
        (state, action) => {
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.loading = false
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchRejected,
          authApi.endpoints.refresh.matchRejected,
          authApi.endpoints.logout.matchRejected
        ),
        (state, action) => {
          state.user = null
          state.accessToken = null
          state.loading = false
          state.error = action.error
        }
      )

      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.loading = false
      })
  },
})

export const { setCredentials, tokenRefreshed, logout } = authSlice.actions

export const selectAuthUser = (state) => state.auth.user
export const selectAccessToken = (state) => state.auth.accessToken

export default authSlice.reducer
