import { useState } from 'react'
import { COLUMNS, DISHES } from './constants'
import styles from './Task6.module.css'
import OrderForm from './components/OrderForm/OrderForm'
import OrderColumn from './components/OrderColumn/OrderColumn'

function Task6() {
  const [waiting, setWaiting] = useState([])
  const [cooking, setCooking] = useState([])
  const [ready, setReady] = useState([])

  function handleAddOrder(dishId) {
    const dish = DISHES.find((d) => d.id === dishId)
    if (!dish) return

    const newOrder = {
      id: new Date().getTime(),
      dish: dish
    }

    setWaiting(prev => [...prev, newOrder])
  }

  function moveOrder(orderId, fromStatus) {
    if (fromStatus === 'waiting') {
      const order = waiting.find(o => o.id === orderId)
      if (!order) return
      
      setWaiting(prev => prev.filter(o => o.id !== orderId))
      setCooking(prev => [...prev, order])
    } else if (fromStatus === 'cooking') {
      const order = cooking.find(o => o.id === orderId)
      if (!order) return
      
      setCooking(prev => prev.filter(o => o.id !== orderId))
      setReady(prev => [...prev, order])
    } else if (fromStatus === 'ready') {
      setReady(prev => prev.filter(o => o.id !== orderId))
    }
  }

  return (
    <div className={styles.container}>
      <h1>Кухонний диспетчер</h1>
      
      <OrderForm onAddOrder={handleAddOrder} />
      
      <div className={styles.columns}>
        <OrderColumn
          title={COLUMNS[0].title}
          orders={waiting}
          buttonText={COLUMNS[0].buttonText}
          onOrderAction={(id) => moveOrder(id, 'waiting')}
        />
        
        <OrderColumn
          title={COLUMNS[1].title}
          orders={cooking}
          buttonText={COLUMNS[1].buttonText}
          onOrderAction={(id) => moveOrder(id, 'cooking')}
        />
        
        <OrderColumn
          title={COLUMNS[2].title}
          orders={ready}
          buttonText={COLUMNS[2].buttonText}
          onOrderAction={(id) => moveOrder(id, 'ready')}
        />
      </div>
    </div>
  )
}

export default Task6
