import { useLogoutMutation } from '../../api/authApi'
import { logout } from '../../api/authSlice'

import { useDispatch } from 'react-redux'

export function useLogout() {
  const [logoutMutation] = useLogoutMutation()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    try {
      await logoutMutation().unwrap()
    } finally {
      dispatch(logout())
    }
  }

  return { logoutUser }
}
