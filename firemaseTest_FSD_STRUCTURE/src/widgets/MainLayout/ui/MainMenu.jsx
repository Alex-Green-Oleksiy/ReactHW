import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import { routes } from '@/app/router'
import styles from './MainMenu.module.css'

export default function MainMenu() {
  const itemsForMenu = routes[0].children
    .filter((r) => r?.meta?.label)
    .map((r) => ({
      path: r.index ? '/' : r.path,
      label: r.meta.label,
    }))
  const cart = useSelector((state) => state.cart)
  return (
    <nav className={styles.nav}>
      {itemsForMenu.map((r) => (
        <NavLink
          key={r.path}
          to={r.path}
          className={({ isActive }) =>
            isActive ? styles.navLink + ' ' + styles.active : styles.navLink
          }
        >
          {r.label}
          {r.label === 'Cart' && <span className={styles.cartBadge}>{cart.length}</span>}
        </NavLink>
      ))}
    </nav>
  )
}
