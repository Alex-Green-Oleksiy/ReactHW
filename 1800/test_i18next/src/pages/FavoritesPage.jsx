import { useAppState } from '@/app/providers/AppStateContext'
import { useTranslation } from 'react-i18next'

export default function FavoritesPage() {
  const { t, i18n } = useTranslation()
  const { favoriteItems, toggleFavorite } = useAppState()
  const lang = i18n.language || 'en'

  if (!favoriteItems.length) return <div>{t('favorites.empty', { defaultValue: 'No favorites yet' })}</div>

  return (
    <div>
      <h2>{t('favorites.title', { defaultValue: 'Favorites' })}</h2>
      <ul>
        {favoriteItems.map((item) => {
          const title = typeof item.title === 'object' ? (item.title?.[lang] ?? item.title?.en ?? '') : item.title
          return (
            <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>★</span>
              <span>{title}</span>
              <button onClick={() => toggleFavorite(item)}>{t('favorites.remove')}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
