import React from 'react'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { postsApi } from '@/api/postsApi'
import ErrorBoundary from '@/components/ErrorBoundary'
import AppRouter from '@/router/AppRouter'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )
}

export default App
