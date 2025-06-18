import { useState } from 'react'
import styles from '../../Task6.module.css'
import { DISHES } from '../../constants'

function OrderForm({ onAddOrder }) {
  const [selectedDish, setSelectedDish] = useState('')

  return (
    <div className={styles.addOrder}>
      <select 
        value={selectedDish}
        onChange={(e) => {
          const dishId = Number(e.target.value)
          if (dishId) {
            onAddOrder(dishId)
            setSelectedDish('')
          }
        }}
        className={styles.select}
      >
        <option value="">Виберіть страву</option>
        {DISHES.map((dish) => (
          <option key={dish.id} value={dish.id}>
            {dish.name} ({dish.prepTime} хв)
          </option>
        ))}
      </select>
    </div>
  )
}

export default OrderForm
