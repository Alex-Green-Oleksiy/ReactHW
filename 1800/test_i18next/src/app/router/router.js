import { createBrowserRouter } from 'react-router'
import { routes } from './routes'
import MainLayout from '../../widgets/layouts/MainLayout'

console.log('routes')
console.log(routes)

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: routes,
  },
])
