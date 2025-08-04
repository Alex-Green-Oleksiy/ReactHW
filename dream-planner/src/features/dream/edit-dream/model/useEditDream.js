import {
  useGetDreamByIdQuery,
  useUpdateDreamMutation,
} from '@/entities/dream'
import { useNavigate } from 'react-router'
import { useDreamForm } from '@/features/dream/dream-form/model/useDreamForm'

// Кастомний хук для редагування мрії
// Отримує dreamId як параметр та повертає стан форми та функцію для збереження
export const useEditDream = (dreamId) => {
  // Хук для навігації між сторінками
  const navigate = useNavigate()
  
  // Отримуємо дані мрії з бази даних за допомогою RTK Query
  const {
    data: dreamData,
    isLoading: isLoadingDream,
    error: loadError,
  } = useGetDreamByIdQuery(dreamId)
  
  // Отримуємо мутацію для оновлення мрії
  const [updateDreamMutation, { isLoading: isUpdating, error: updateError }] =
    useUpdateDreamMutation()

  // Використовуємо useDreamForm для управління станом форми
  // Передаємо початкові значення з dreamData або порожні рядки
  const { 
    description, 
    setDescription, 
    targetYear, 
    setTargetYear, 
    friend, 
    setFriend 
  } = useDreamForm(
    dreamData?.description || '',
    dreamData?.targetYear || '',
    dreamData?.friend || ''
  )

  // Функція для збереження змін мрії
  const editDream = async () => {
    try {
      // Викликаємо мутацію для оновлення мрії
      await updateDreamMutation({
        id: dreamId,
        data: { description, targetYear: +targetYear, friend }, // + перетворює рядок в число
      }).unwrap()
      // Після успішного оновлення переходимо на сторінку зі списком мрій
      navigate('/dreams')
      return true
    } catch (e) {
      // Якщо сталася помилка, виводимо її в консоль
      console.error('Failed to update dream:', e)
      return false
    }
  }

  // Повертаємо всі необхідні дані та функції
  return {
    description,
    setDescription,
    targetYear,
    setTargetYear,
    friend,
    setFriend,
    isLoadingDream, // Стан завантаження даних мрії
    loadError,      // Помилка завантаження
    isUpdating,     // Стан оновлення мрії
    updateError,    // Помилка оновлення
    editDream,      // Функція для збереження змін
  }
} 