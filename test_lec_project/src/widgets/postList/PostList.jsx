import { useState, useEffect } from 'react'
import { useGetPostsQuery, useDeletePostMutation } from '@/entities/post/api/postApi'
import { PostCard } from '@/entities/post'
import { PostEditModal } from '@/features/posts'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import './PostList.css'

export function PostList() {
  const [page, setPage] = useState(1)
  const [editingPost, setEditingPost] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const user = useSelector(selectAuthUser)

  const { data, isLoading, error } = useGetPostsQuery({ page, limit: 5 })
  const [deletePost] = useDeletePostMutation()

  // Обчислення списку та кількості сторінок одразу, щоб гук нижче не був умовним
  const posts = data?.items || []
  const totalPages = data?.totalPages || 1

  // Якщо після видалень сторінка спорожніла — перейти на попередню
  // Також підрівнюємо сторінку, якщо вона стала більшою за totalPages
  useEffect(() => {
    if (isLoading) return

    if (page > 1 && posts.length === 0) {
      setPage((p) => Math.max(1, p - 1))
      return
    }

    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages)
    }
  }, [posts.length, totalPages, page, isLoading])

  const handleEdit = (post) => {
    setEditingPost(post)
  }

  const handleDelete = async (postId) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей пост?')) {
      try {
        await deletePost(postId).unwrap()
      } catch {
        alert('Помилка видалення поста')
      }
    }
  }

  const closeModal = () => {
    setEditingPost(null)
    setShowCreateModal(false)
  }

  if (isLoading) return <div className="loading-message">Завантаження постів...</div>
  if (error) return <div className="error-message">Помилка: {error.toString()}</div>

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h2 className="post-list-title">Пости</h2>
        {(user?.role === roles.admin || user?.role === roles.manager) && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="create-post-button"
          >
            Створити пост
          </button>
        )}
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          Попередня
        </button>
        <div className="pagination-info">Сторінка {page} з {totalPages}</div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Наступна
        </button>
      </div>

      {(editingPost || showCreateModal) && (
        <PostEditModal
          post={editingPost}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
