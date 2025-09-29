import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useRefreshMutation } from '@/features/auth'

export function AppInit() {
  const [refresh] = useRefreshMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      try {
        await refresh().unwrap()
      } catch (error) {
        // 401 без refresh cookie — очікувано при холодному старті, ігноруємо
        // Логуємо тільки неочікувані помилки
        if (error?.status !== 401) {
          console.warn('Неочікувана помилка при ініціалізації:', error)
        }
      }
    }
    init()
  }, [refresh, dispatch])

  return null
}
