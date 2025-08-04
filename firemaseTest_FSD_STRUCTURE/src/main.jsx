import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { store, router } from './app'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
