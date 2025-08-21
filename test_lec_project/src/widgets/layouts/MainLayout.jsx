import { Outlet } from 'react-router'
import { Header } from '../Header'
import { Footer } from './Footer'
import { TestCredentials } from './TestCredentials'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
        <TestCredentials />
      </div>
      <Footer />
    </div>
  )
}
