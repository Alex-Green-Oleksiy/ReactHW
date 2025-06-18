import Card from './Card'
import styles from './CardsList.module.css'

function CardsList({ sourceList }) {
  return (
    <div className={styles['list-container']}>
      {sourceList.map((cardData) => (
        <Card key={cardData.id} {...cardData} />
      ))}
    </div>
  )
}

export default CardsList
