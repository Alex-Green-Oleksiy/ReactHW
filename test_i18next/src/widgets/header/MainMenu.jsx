import { NavLink, Link } from 'react-router-dom'
import { frontRoutes } from '@/shared/config/frontRoutes'
import { useTranslation } from 'react-i18next'
import styles from './MainMenu.module.css'
import { useAppState } from '@/app/providers/AppStateContext'
import { signOut } from '@/shared/firebase/firebase'

export default function MainMenu() {
  const { t } = useTranslation()
  const { user, favoriteItems } = useAppState()

  const handleSignOut = () => {
    signOut().catch((e) => console.error('Sign out error', e))
  }

  const role = user?.role || 'guest'

  const menuItems = Object.values(frontRoutes).filter((route) => {
    if (!route.meta?.isInMenu) return false

    const access = {
      home: ['guest', 'user', 'admin'],
      about: ['guest', 'user', 'admin'],
      products: ['guest', 'user', 'admin'],
      cart: ['user', 'admin'],
      favorites: ['user', 'admin'],
      'user-edit': ['user', 'admin'],
      'product-edit': ['admin'],
    }

    return access[route.meta.title]?.includes(role)
  })

  return (
    <nav className={styles.menu}>
      {menuItems.map((route) => (
        <NavLink
          key={route.navigationPath}
          to={route.navigationPath}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : null].filter(Boolean).join(' ')
          }
        >
          {t(`${route.meta?.title}.menuLabel`)}
          {route.meta?.title === 'favorites' && favoriteItems.length > 0 ? (
            <span className={styles.badge}>{favoriteItems.length}</span>
          ) : null}
        </NavLink>
      ))}

      <div className={styles.authControls}>
        {user ? (
          <>
            <span className={styles.userEmail}>{user.email}</span>
            <button onClick={handleSignOut} className={styles.link}>
              {t('auth.signOut')}
            </button>
          </>
        ) : (
          <>
            <Link to={frontRoutes.LoginPage.navigationPath} className={styles.link}>
              {t('auth.signIn')}
            </Link>
            <Link to={frontRoutes.RegisterPage.navigationPath} className={styles.link}>
              {t('auth.signUp')}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
