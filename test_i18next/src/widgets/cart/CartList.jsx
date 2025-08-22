import CartItemCardWithActions from '@/entities/cart/CartItemCardWithActions'
import { useTranslation } from 'react-i18next'
import styles from './CartList.module.css'

export default function CartList({ items }) {
  const { t } = useTranslation()
  if (!items?.length) return <div className={styles.empty}>{t('cart.empty')}</div>
  return (
    <div className={styles.grid}>
      {items.map((i) => (
        <CartItemCardWithActions key={i.id} item={i} />
      ))}
    </div>
  )
}
