import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * AppInit — компонент для глобальних ініціалізацій (синхронізація мови, глобальні слухачі тощо)
 * Має бути підключений у корені додатку (наприклад, у App.jsx)
 */
export default function AppInit() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const onStorage = (e) => {
      if (
        e.key === 'i18nextLng' &&
        e.newValue &&
        e.newValue !== i18n.language
      ) {
        i18n.changeLanguage(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [i18n])

  return null // Не рендерить нічого
}
