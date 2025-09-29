import { useAppState } from '@/app/providers/AppStateContext'
import CartList from '@/widgets/cart/CartList'
import { useTranslation } from 'react-i18next'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { t } = useTranslation()
  const { 
    cartItems, 
    addToCart, 
    clearCart, 
    getCartTotal, 
    getCartItemsCount,
    user 
  } = useAppState()

  // Demo add button for testing
  const demoAdd = () =>
    addToCart({ 
      id: String(Math.random()).slice(2, 6), 
      title: 'Demo Product', 
      price: 9.99,
      imageUrl: 'https://via.placeholder.com/150'
    })

  const handleCheckout = () => {
    if (!user) {
      alert(t('cart.loginRequired'))
      return
    }
    
    if (cartItems.length === 0) {
      alert(t('cart.empty'))
      return
    }
    
    // Here you would integrate with a payment system
    alert(t('cart.checkoutDemo'))
    clearCart()
  }

  const total = getCartTotal()
  const itemsCount = getCartItemsCount()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{t('cart.title')}</h2>
        {cartItems.length > 0 && (
          <div className={styles.summary}>
            <span>{t('cart.itemsCount', { count: itemsCount })}</span>
            <span className={styles.total}>{t('cart.total')}: ${total.toFixed(2)}</span>
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <p>{t('cart.empty')}</p>
          <button onClick={demoAdd} className={styles.demoButton}>
            {t('cart.addDemo')}
          </button>
        </div>
      ) : (
        <>
          <CartList items={cartItems} />
          <div className={styles.actions}>
            <button onClick={clearCart} className={styles.clearButton}>
              {t('cart.clear')}
            </button>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              {t('cart.checkout')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
