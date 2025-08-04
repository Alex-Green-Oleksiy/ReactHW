import { useDeleteDreamMutation } from '@/entities/dream'
export const useDeleteDream = () => {
  const [deleteDreamMutation, { isLoading, error }] = useDeleteDreamMutation()
  const handleDeleteDream = async (dreamId) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю мрію?')) {
      try {
        await deleteDreamMutation(dreamId).unwrap()
        console.log(`Dream ${dreamId} deleted successfully.`)
        return true
      } catch (e) {
        console.error('Failed to delete dream:', e)
        return false
      }
    }
    return false
  }
  return { handleDeleteDream, isLoading, error }
} 