// import { useRefreshMutation } from '../../model/authApi'
import { useDispatch } from 'react-redux'
import { tokenRefreshed, logout } from '@/shared/api/authSlice'
import { useRefreshMutation } from '@/shared/model/authApi'

export function useRefreshToken() {
  const [refreshMutation] = useRefreshMutation()
  const dispatch = useDispatch()

  async function refresh() {
    try {
      const result = await refreshMutation()
      if (result.data) {
        dispatch(tokenRefreshed(result.data))
        return true
      }
    } catch {
      dispatch(logout())
      return false
    }
  }

  return { refresh }
}
