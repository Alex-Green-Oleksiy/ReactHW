import HomePage from '@/pages/HomePage'
import ContactsPage from '@/pages/ContactsPage'
import PostsPage from '@/pages/PostsPage'
import PostsInfinite from '@/pages/PostsInfinite'
import PostEditPage from '@/pages/PostEditPage'
import MainLayout from '@/components/MainLayout/MainLayout'
import { Navigate } from 'react-router'

export const pagesRoutes = [
  {
    path: '/',
    element: <HomePage />,
    meta: { title: 'Home' },
  },
  {
    path: '/posts',
    element: <PostsPage />,
    meta: { title: 'Posts' },
  },
  {
    path: '/posts-infinite',
    element: <PostsInfinite />,
    meta: { title: 'Infinite' },
  },
  {
    path: '/posts/edit/:id?',
    element: <PostEditPage />,
    meta: { notInMenu: true },
  },
  {
    path: '/contacts',
    element: <ContactsPage />,
    meta: { title: 'Contacts' },
  },
]

const routes = [
  {
    element: <MainLayout />,
    children: pagesRoutes,
  },
  // Перенаправлення неіснуючих шляхів на головну
  { path: '*', element: <Navigate to="/" replace /> },
]

export default routes
