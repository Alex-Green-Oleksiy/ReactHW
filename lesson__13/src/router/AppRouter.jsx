import React from 'react'
import { RouterProvider } from 'react-router'
import router from './router'

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter 