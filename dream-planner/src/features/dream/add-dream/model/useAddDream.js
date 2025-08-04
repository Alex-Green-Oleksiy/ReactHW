import { useAddDreamMutation } from '@/entities/dream'
import { useNavigate } from 'react-router'

// Кастомний хук для додавання нової мрії
// Повертає функцію addDream та стан завантаження
export const useAddDream = () => {
  // Отримуємо мутацію з RTK Query для додавання мрії
  const [addDreamMutation, { isLoading, error }] = useAddDreamMutation()
  // Хук для навігації між сторінками
  const navigate = useNavigate()

  // Функція для додавання мрії
  const addDream = async (dreamData) => {
    try {
      // Викликаємо мутацію та чекаємо результат
      await addDreamMutation(dreamData).unwrap()
      // Після успішного додавання переходимо на сторінку зі списком мрій
      navigate('/dreams')
      return true
    } catch (e) {
      // Якщо сталася помилка, виводимо її в консоль
      console.error('Failed to add dream:', e)
      return false
    }
  }

  // Повертаємо функцію та стан для використання в компонентах
  return { addDream, isLoading, error }
} 