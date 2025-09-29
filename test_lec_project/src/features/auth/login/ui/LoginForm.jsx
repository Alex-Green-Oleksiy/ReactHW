import React, { useState } from 'react'
import { useLogin } from '../model/useLogin'
import { useNavigate } from 'react-router'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import './LoginForm.css'

export function LoginForm() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('123456')
  const { login, isLoading, error } = useLogin()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await login({ email, password })
    if (result.user) navigate(frontRoutes.pages.HomePage.navigationPath)
  }

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Вхід у систему</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Введіть email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Пароль
          </label>
          <input
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="form-input"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="login-button"
        >
          {isLoading ? 'Завантаження...' : 'Увійти'}
        </button>
        {error && (
          <div className="error-message">
            {error.data?.error || error.data?.message || 'Помилка входу'}
          </div>
        )}
      </form>
    </div>
  )
}
