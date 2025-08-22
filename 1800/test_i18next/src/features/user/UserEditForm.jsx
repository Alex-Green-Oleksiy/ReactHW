import UserForm from '@/entities/user/UserForm'

export default function UserEditForm({ initialValues, onSubmit }) {
  return <UserForm initialValues={initialValues} onSubmit={onSubmit} />
}
