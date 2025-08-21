import { frontRoutes } from '@/shared/config/routes/frontRoutes'

const pagesList = Object.keys(frontRoutes.pages)

// Використовуємо Vite glob imports, щоб уникнути помилки MIME в проді
const modules = import.meta.glob('/src/pages/*.jsx')

export const appRouterRoutes = pagesList.map((page) => ({
  ...frontRoutes.pages[page],
  lazy: async () => {
    const path = `/src/pages/${page}.jsx`
    const loader = modules[path]
    if (!loader) {
      throw new Error(`Page module not found for: ${path}`)
    }
    const mod = await loader()
    return { Component: mod.default }
  },
}))
