import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UserForm({ initialValues, onSubmit }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    role: initialValues?.role || 'user',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <label>
        {t('user.name')}
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        {t('user.email')}
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        {t('user.role')}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">{t('user.roles.user')}</option>
          <option value="admin">{t('user.roles.admin')}</option>
        </select>
      </label>
      <button type="submit">{t('common.save')}</button>
    </form>
  )
}
