import styles from './Card.module.css'
function Card({ title, imgSrc, link }) {
  return (
    <a href={link} className={styles['card-container']}>
      <div className={styles['card-image-wrapper']}>
        <img src={imgSrc} alt="card" className={styles['card-image']} />
      </div>
      <div className={styles['card-title']}>{title}</div>
    </a>
  )
}

export default Card
