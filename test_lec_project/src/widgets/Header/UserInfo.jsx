import { useLogout } from '@/features/auth'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import './UserInfo.css'

export function UserInfo() {
  const user = useSelector(selectAuthUser)
  const navigate = useNavigate()
  const { logoutUser } = useLogout()

  if (!user) {
    return (
      <Link
        to={frontRoutes.pages.LoginPage.navigationPath}
        className="login-button"
      >
        Увійти
      </Link>
    )
  }

  const onLogout = () => {
    logoutUser()
    navigate(frontRoutes.pages.LoginPage.navigationPath)
  }

  return (
    <div className="user-info">
      <span className="user-info-text">
        {user.name} ({user.role})
      </span>
      <button 
        onClick={onLogout} 
        className="logout-button"
      >
        Вийти
      </button>
    </div>
  )
}
