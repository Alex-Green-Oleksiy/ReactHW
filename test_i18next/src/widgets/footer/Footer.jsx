import styles from './Footer.module.css'

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <span>© {new Date().getFullYear()} My Shop</span>
      </div>
    </div>
  )
}
