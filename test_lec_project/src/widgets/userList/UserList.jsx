import React, { useState } from 'react'
import { useGetUsersQuery } from '@/entities/user/api/userApi'
import { UserListItem } from '@/entities/user'
import { UserCreateForm } from '@/features/users'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import './UserList.css'

export function UserList() {
  const [page, setPage] = useState(1)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const user = useSelector(selectAuthUser)

  const { data, isLoading, error } = useGetUsersQuery({ page, limit: 10 })

  if (isLoading) return <div className="loading-message">Завантаження користувачів...</div>
  if (error) return <div className="error-message">Помилка: {error.toString()}</div>

  const users = data?.items || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2 className="user-list-title">Користувачі</h2>
        {user?.role === roles.admin && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="add-user-button"
          >
            Додати користувача
          </button>
        )}
      </div>
      
      <div className="user-list">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          Попередня
        </button>
        <span>Сторінка {page} з {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Наступна
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserCreateForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
