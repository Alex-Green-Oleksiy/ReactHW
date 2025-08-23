import { createBrowserRouter } from 'react-router'
import { routes } from '@/app/router/routes.jsx'
import MainLayout from '@/widgets/layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: routes,
  },
])
