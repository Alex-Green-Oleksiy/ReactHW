import { useAppState } from '@/app/providers/AppStateContext'
import CartList from '@/widgets/cart/CartList'
import { useTranslation } from 'react-i18next'

export default function CartPage() {
  const { t } = useTranslation()
  const { cartItems, addToCart } = useAppState()

  // Demo add button for testing
  const demoAdd = () =>
    addToCart({ id: String(Math.random()).slice(2, 6), title: 'Demo Product', price: 9.99 })

  return (
    <div>
      <h2>{t('cart.title')}</h2>
      <button onClick={demoAdd}>{t('cart.addDemo')}</button>
      <CartList items={cartItems} />
    </div>
  )
}
