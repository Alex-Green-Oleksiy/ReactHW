import React, { useState } from 'react'
import { useCreateUserMutation } from '@/entities/user/api/userApi'
import { roles } from '@/shared/config/roles'
import './UserCreateForm.css'

export function UserCreateForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roles.user,
  })
  const [createUser, { isLoading }] = useCreateUserMutation()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUser(formData).unwrap()
      onClose()
    } catch {
      alert('Помилка створення користувача')
    }
  }

  return (
    <div className="user-create-form">
      <h3 className="form-title">Створити нового користувача</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Ім'я:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Пароль:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Роль:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value={roles.user}>Користувач</option>
              <option value={roles.manager}>Менеджер</option>
              <option value={roles.admin}>Адміністратор</option>
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Створення...' : 'Створити'}
          </button>
          <button type="button" onClick={onClose} className="cancel-button">
            Скасувати
          </button>
        </div>
      </form>
    </div>
  )
}
