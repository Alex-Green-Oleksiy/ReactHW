import { MainMenu } from './MainMenu'
import { UserInfo } from './UserInfo'
import './Header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Auth Test</h1>
            <MainMenu />
          </div>
          <UserInfo />
        </div>
      </div>
    </header>
  )
}
