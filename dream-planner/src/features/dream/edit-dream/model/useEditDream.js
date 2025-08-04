import {
  useGetDreamByIdQuery,
  useUpdateDreamMutation,
} from '@/entities/dream'
import { useNavigate } from 'react-router'
import { useDreamForm } from '@/features/dream/dream-form/model/useDreamForm'
export const useEditDream = (dreamId) => {
  const navigate = useNavigate()
  const {
    data: dreamData,
    isLoading: isLoadingDream,
    error: loadError,
  } = useGetDreamByIdQuery(dreamId)
  const [updateDreamMutation, { isLoading: isUpdating, error: updateError }] =
    useUpdateDreamMutation()
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
  const editDream = async () => {
    try {
      await updateDreamMutation({
        id: dreamId,
        data: { description, targetYear: +targetYear, friend }, // + перетворює рядок в число
      }).unwrap()
      navigate('/dreams')
      return true
    } catch (e) {
      console.error('Failed to update dream:', e)
      return false
    }
  }
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