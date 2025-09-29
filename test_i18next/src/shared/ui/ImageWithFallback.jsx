import { useState } from 'react'
import styles from './ImageWithFallback.module.css'

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder-image.png',
  className = '',
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
    setImgSrc(fallbackSrc)
  }

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${loading ? styles.hidden : ''}`}
      />
    </div>
  )
}
