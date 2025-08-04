import { Outlet } from 'react-router'
import { MainMenu } from './ui'
import styles from './ui/MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <MainMenu />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
