import { useState, useEffect } from 'react'

// Кастомний хук для управління станом форми мрії
// Отримує початкові значення та повертає стан та функції для його зміни
export const useDreamForm = (initialDescription = '', initialTargetYear = '', initialFriend = '') => {
  // Стан для опису мрії
  const [description, setDescription] = useState(initialDescription)
  // Стан для цільового року
  const [targetYear, setTargetYear] = useState(initialTargetYear)
  // Стан для імені друга
  const [friend, setFriend] = useState(initialFriend)

  // useEffect для оновлення стану при зміні початкових значень
  // Це потрібно для випадку редагування, коли дані завантажуються з сервера
  useEffect(() => {
    setDescription(initialDescription)
    setTargetYear(initialTargetYear)
    setFriend(initialFriend)
  }, [initialDescription, initialTargetYear, initialFriend])

  // Повертаємо стан та функції для його зміни
  return {
    description,
    setDescription,
    targetYear,
    setTargetYear,
    friend,
    setFriend,
  }
} 