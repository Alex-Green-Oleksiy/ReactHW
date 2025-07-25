import React from 'react'
import { NavLink } from 'react-router'
import { pagesRoutes } from '@/router/routes'

const MainMenu = () => {
  return (
    <nav className="main-menu">
      <ul className="main-menu__list">
        {pagesRoutes
          .filter((route) => !route.meta.notInMenu)
          .map(({ path, meta }) => (
            <li className="main-menu__item" key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  'main-menu__link' + (isActive ? ' main-menu__link--active' : '')
                }
                end={path === '/'}
              >
                {meta.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default MainMenu
