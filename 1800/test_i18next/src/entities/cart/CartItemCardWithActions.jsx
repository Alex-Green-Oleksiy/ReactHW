import { useTranslation } from 'react-i18next'
import { useAppState } from '@/app/providers/AppStateContext'
import styles from './CartItemCardWithActions.module.css'

export default function CartItemCardWithActions({ item }) {
  const { t, i18n } = useTranslation()
  const { updateCartQty, removeFromCart, toggleFavorite, user, favoriteItems } = useAppState()
  const isFav = favoriteItems.some((i) => i.id === item.id)
  const lang = i18n.language || 'en'
  const title = typeof item.title === 'object' ? (item.title?.[lang] ?? item.title?.en ?? '') : item.title

  return (
    <div className={[styles.card, isFav ? styles.fav : null].filter(Boolean).join(' ')}>
      <div className={styles.info}>
        <div>
          {isFav ? <span className={styles.star}>★ </span> : null}
          {title}
        </div>
        <div className={styles.price}>
          {t('cart.price')}: {item.price}
        </div>
      </div>
      <div className={styles.controls}>
        <label>
          {t('cart.qty')}
          <input
            type="number"
            min={1}
            value={item.qty}
            onChange={(e) => updateCartQty(item.id, Number(e.target.value))}
            className={styles.qtyInput}
          />
        </label>
      </div>
      <button onClick={() => removeFromCart(item.id)}>{t('common.remove')}</button>
      <button onClick={() => toggleFavorite({ id: item.id, title: item.title, price: item.price })} disabled={user?.role !== 'user'}>
        {isFav ? t('favorites.remove') : t('favorites.add')}
      </button>
    </div>
  )
}
