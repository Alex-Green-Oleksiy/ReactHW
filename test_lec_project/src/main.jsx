import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { AppInit } from './app/init/AppInit'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppInit />
    <RouterProvider router={router} />
  </Provider>
)
