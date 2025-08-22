import { frontRoutes } from '@/shared/config/frontRoutes'

// Pre-bundle all pages for safe lazy-loading in Vite
// This avoids runtime URL imports that break on production (e.g., Vercel)
const pages = import.meta.glob('../../pages/*.jsx')

export const routes = Object.entries(frontRoutes).map(([page, route]) => {
  const key = `../../pages/${page}.jsx`

  return {
    ...route,
    lazy: async () => ({
      Component: (await pages[key]()).default,
    }),
  }
})
