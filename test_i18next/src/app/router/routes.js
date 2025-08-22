import { frontRoutes } from '@/shared/config/frontRoutes'

export const routes = Object.entries(frontRoutes).map(([page, route]) => {
  const componentPath = `../../pages/${page}`

  return {
    ...route,
    lazy: async () => ({
      Component: (await import(/* @vite-ignore */ componentPath)).default,
    }),
  }
})
