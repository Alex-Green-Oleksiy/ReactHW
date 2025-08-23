import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import '@/i18n/i18n'
import { router } from '@/app/router/router'
import AppInit from '@/AppInit'
import { Suspense } from 'react'
import { AppStateProvider } from '@/app/providers/AppState'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading...</div>}>
    <AppStateProvider>
      <AppInit />
      <RouterProvider router={router} />
    </AppStateProvider>
  </Suspense>
)
