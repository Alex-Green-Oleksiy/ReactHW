import { CommentItem } from './CommentItem'
import { useGetCommentsByPostQuery } from '../api/commentApi'
import { DeleteCommentButton } from '@/features/comments'
import './CommentList.css'

export function CommentList({ postId }) {
  const { data, isLoading, error } = useGetCommentsByPostQuery({
    postId,
  })

  if (isLoading) return <div className="loading-message">Завантаження коментарів...</div>
  if (error) return <div className="error-message">Помилка: {error.toString()}</div>

  const comments = data || []

  return (
    <div className="comment-list">
      <h4 className="comment-list-title">Коментарі</h4>
      {comments.map((c) => (
        <CommentItem 
          key={c.id} 
          comment={c} 
          deleteButton={<DeleteCommentButton comment={c} />}
        />
      ))}
    </div>
  )
}
