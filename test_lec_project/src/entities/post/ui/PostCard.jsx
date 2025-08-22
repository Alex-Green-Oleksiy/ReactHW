import { useState } from 'react'
import { roles } from '@/shared/config/roles'

import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'

import { CommentList } from '@/entities/comment'
import { CommentForm } from '@/features/commentAdd'
import './PostCard.css'

export function PostCard({ post, onEdit, onDelete }) {
  const [showComments, setShowComments] = useState(false)
  const user = useSelector(selectAuthUser)

  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.body}</p>
      <div className="post-author">
        <small>Автор: {post.author?.name}</small>
      </div>
      {(user?.role === roles.admin ||
        (user?.role === roles.manager && post.authorId === user.id)) && (
        <div className="post-actions">
          <button onClick={() => onEdit(post)} className="post-button edit-button">Редагувати</button>
          <button onClick={() => onDelete(post.id)} className="post-button delete-button">Видалити</button>
        </div>
      )}
      <button
        onClick={() => setShowComments((v) => !v)}
        className="post-button toggle-comments-button"
      >
        {showComments ? 'Сховати коментарі' : 'Показати коментарі'}
      </button>
      {showComments && (
        <>
          <CommentList postId={post.id} />
          {user && <CommentForm postId={post.id} />}
        </>
      )}
    </div>
  )
}
