import { NavLink } from 'react-router-dom'
import { frontRoutes } from '@/shared/config/frontRoutes'
import { useTranslation } from 'react-i18next'
import styles from './MainMenu.module.css'
import { useAppState } from '@/app/providers/AppStateContext'

export default function MainMenu() {
  const { t } = useTranslation()
  const { favoriteItems } = useAppState()
  const menuItems = Object.values(frontRoutes).filter(
    (route) => route.meta?.isInMenu
  )
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
    </nav>
  )
}
