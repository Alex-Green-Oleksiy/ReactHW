import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import { useDeleteUserMutation } from '../api/userApi'
import './UserListItem.css'

export function UserListItem({ user }) {
  const currentUser = useSelector(selectAuthUser)
  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  const canDelete = currentUser?.role === roles.admin && currentUser?.id !== user.id

  const handleDelete = async () => {
    if (window.confirm(`Ви впевнені, що хочете видалити користувача ${user.name}?`)) {
      try {
        await deleteUser(user.id).unwrap()
      } catch {
        alert('Помилка видалення користувача')
      }
    }
  }

  return (
    <div className="user-list-item">
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
        <div className="user-role">Роль: {user.role}</div>
      </div>
      {canDelete && (
        <div className="user-actions">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="delete-user-button"
          >
            {isLoading ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      )}
    </div>
  )
}
