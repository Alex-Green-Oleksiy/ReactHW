import React, { useState, useEffect } from 'react'
import { useCreatePostMutation, useUpdatePostMutation } from '@/entities/post/api/postApi'
import './PostEditModal.css'

export function PostEditModal({ post, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  })

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const isEditing = !!post
  const isLoading = isCreating || isUpdating

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
      })
    }
  }, [post])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updatePost({ id: post.id, data: { ...formData } }).unwrap()
      } else {
        await createPost({ ...formData }).unwrap()
      }
      onClose()
    } catch {
      alert('Помилка збереження поста')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">{isEditing ? 'Редагувати пост' : 'Створити пост'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Заголовок:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Текст:
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                rows={5}
                className="form-textarea"
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="submit" disabled={isLoading} className="save-button">
              {isLoading ? 'Збереження...' : 'Зберегти'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
