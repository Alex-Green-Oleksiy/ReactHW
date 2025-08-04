import { useAddDreamMutation } from '@/entities/dream'
import { useNavigate } from 'react-router'
export const useAddDream = () => {
  const [addDreamMutation, { isLoading, error }] = useAddDreamMutation()
  const navigate = useNavigate()
  const addDream = async (dreamData) => {
    try {
      await addDreamMutation(dreamData).unwrap()
      navigate('/dreams')
      return true
    } catch (e) {
      console.error('Failed to add dream:', e)
      return false
    }
  }
  return { addDream, isLoading, error }
} 