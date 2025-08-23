import { useState } from 'react'
import { useCreateCommentMutation } from '@/entities/comment/api/commentApi'
import './CommentForm.css'

export function CommentForm({ postId }) {
  const [content, setContent] = useState('')
  const [createComment, { isLoading }] = useCreateCommentMutation()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    await createComment({ postId, text: content })
    setContent('')
  }

  return (
    <form onSubmit={onSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Напишіть коментар..."
        required
        className="comment-textarea"
      />
      <button type="submit" disabled={isLoading} className="comment-submit-button">
        {isLoading ? 'Додається...' : 'Додати коментар'}
      </button>
    </form>
  )
}
