import { useState, useEffect } from 'react'
export const useDreamForm = (initialDescription = '', initialTargetYear = '', initialFriend = '') => {
  const [description, setDescription] = useState(initialDescription)
  const [targetYear, setTargetYear] = useState(initialTargetYear)
  const [friend, setFriend] = useState(initialFriend)
  useEffect(() => {
    setDescription(initialDescription)
    setTargetYear(initialTargetYear)
    setFriend(initialFriend)
  }, [initialDescription, initialTargetYear, initialFriend])
  return {
    description,
    setDescription,
    targetYear,
    setTargetYear,
    friend,
    setFriend,
  }
} 