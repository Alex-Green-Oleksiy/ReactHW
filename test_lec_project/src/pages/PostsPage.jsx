import { selectAuthUser } from '@/features/auth'
import { PostList } from '@/widgets/postList/PostList'
import { useSelector } from 'react-redux'

export default function PostsPage() {
  const user = useSelector(selectAuthUser)
  return (
    <div>
      <h1>Оголошення</h1>
      <PostList user={user} />
    </div>
  )
}
