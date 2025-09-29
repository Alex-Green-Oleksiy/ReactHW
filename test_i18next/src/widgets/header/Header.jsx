import MainMenu from './MainMenu'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher'
import { useAppState } from '@/app/providers/AppStateContext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Header.module.css'

export function Header() {
  const { getCartItemsCount, user } = useAppState()
  const { t } = useTranslation()
  const cartItemsCount = getCartItemsCount()

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <MainMenu />
        <div className={styles.right}>
          {cartItemsCount > 0 && (
            <Link to="/cart" className={styles.cartLink}>
              <span className={styles.cartIcon}>🛒</span>
              <span className={styles.cartCount}>{cartItemsCount}</span>
            </Link>
          )}
          <LanguageSwitcher />
          {user && (
            <div className={styles.userInfo}>
              <span className={styles.userRole}>{t(`user.roles.${user.role}`)}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
