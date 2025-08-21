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
      } catch {
        // 401 без refresh cookie — очікувано при холодному старті, ігноруємо
        // інші помилки можна залогувати за потреби
      }
    }
    init()
  }, [refresh, dispatch])

  return null
}
