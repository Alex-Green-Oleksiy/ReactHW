import styles from '../../Task6.module.css'

function OrderColumn({ title, orders, buttonText, onOrderAction }) {
  return (
    <div className={styles.column}>
      <h2>{title} ({orders.length})</h2>
      <div className={styles.ordersList}>
        {orders.length === 0 ? (
          <p className={styles.empty}>Немає замовлень</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id} className={styles.orderItem}>
                <div className={styles.dishName}>{order.dish.name}</div>
                <button 
                  onClick={() => onOrderAction(order.id)}
                  className={styles.actionButton}
                >
                  {buttonText}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default OrderColumn
