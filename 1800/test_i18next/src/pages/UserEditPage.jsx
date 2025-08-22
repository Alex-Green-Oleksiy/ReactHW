import UserEditForm from '@/features/user/UserEditForm'
import { useAppState } from '@/app/providers/AppStateContext'
import { useTranslation } from 'react-i18next'

export default function UserEditPage() {
  const { t } = useTranslation()
  const { user, setUser } = useAppState()

  const handleSubmit = (values) => {
    setUser((prev) => ({ ...prev, ...values }))
    alert(t('user.saved'))
  }

  return (
    <div>
      <h2>{t('user.editTitle')}</h2>
      <UserEditForm initialValues={user} onSubmit={handleSubmit} />
    </div>
  )
}
