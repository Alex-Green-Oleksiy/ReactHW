import { UserList } from '@/widgets/userList/UserList'

import { roles } from '@/shared/config/roles'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth'

export default function UsersPage() {
  const user = useSelector(selectAuthUser)

  if (!user || user.role !== roles.admin) {
    return (
      <div>
        Доступ заборонено. Ця сторінка доступна лише для адміністратора.
      </div>
    )
  }

  return (
    <div>
      <h1>Користувачі</h1>
      <UserList />
    </div>
  )
}
