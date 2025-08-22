import React from 'react'
import { useDeleteCommentMutation } from '@/entities/comment/api/commentApi'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import './DeleteCommentButton.css'

export function DeleteCommentButton({ comment }) {
  const user = useSelector(selectAuthUser)
  const [deleteComment, { isLoading }] = useDeleteCommentMutation()

  const canDelete = user?.role === roles.admin || user?.id === comment.authorId
  if (!canDelete) return null

  const handleDelete = async () => {
    if (window.confirm('Ви впевнені, що хочете видалити цей коментар?')) {
      try {
        await deleteComment(comment.id).unwrap()
      } catch {
        alert('Помилка видалення коментаря')
      }
    }
  }

  return (
    <button onClick={handleDelete} disabled={isLoading} className="delete-comment-button">
      {isLoading ? 'Видалення...' : 'Видалити'}
    </button>
  )
}
