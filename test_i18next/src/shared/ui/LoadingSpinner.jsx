import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  )
}
