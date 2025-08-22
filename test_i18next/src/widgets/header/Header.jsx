import MainMenu from './MainMenu'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher'
import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <MainMenu />
        <div className={styles.right}>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
