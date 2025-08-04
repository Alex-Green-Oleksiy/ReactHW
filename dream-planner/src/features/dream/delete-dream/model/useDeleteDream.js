import { useDeleteDreamMutation } from '@/entities/dream'

// Кастомний хук для видалення мрії
// Повертає функцію handleDeleteDream та стан завантаження
export const useDeleteDream = () => {
  // Отримуємо мутацію з RTK Query для видалення мрії
  const [deleteDreamMutation, { isLoading, error }] = useDeleteDreamMutation()

  // Функція для видалення мрії з підтвердженням
  const handleDeleteDream = async (dreamId) => {
    // Показуємо діалог підтвердження перед видаленням
    if (window.confirm('Ви впевнені, що хочете видалити цю мрію?')) {
      try {
        // Викликаємо мутацію для видалення мрії
        await deleteDreamMutation(dreamId).unwrap()
        // Виводимо повідомлення про успішне видалення
        console.log(`Dream ${dreamId} deleted successfully.`)
        return true
      } catch (e) {
        // Якщо сталася помилка, виводимо її в консоль
        console.error('Failed to delete dream:', e)
        return false
      }
    }
    // Якщо користувач скасував видалення, повертаємо false
    return false
  }

  // Повертаємо функцію та стан для використання в компонентах
  return { handleDeleteDream, isLoading, error }
} 