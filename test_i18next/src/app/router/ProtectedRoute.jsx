import { Navigate } from 'react-router-dom'
import { useAppState } from '@/app/providers/AppStateContext'
import { frontRoutes } from '@/shared/config/frontRoutes'

export function ProtectedRoute({ children, route }) {
  const { user } = useAppState()
  const { meta } = route

  if (meta.guestOnly && user) {
    // Redirect logged-in users from guest-only pages (like Login)
    return <Navigate to={frontRoutes.HomePage.navigationPath} replace />
  }

  if (meta.requireAuth && !user) {
    // Redirect unauthenticated users from protected pages
    return <Navigate to={frontRoutes.LoginPage.navigationPath} replace />
  }

  if (meta.roles && !meta.roles.includes(user?.role)) {
    // Redirect users without the required role
    return <Navigate to={frontRoutes.HomePage.navigationPath} replace />
  }

  return children
}
