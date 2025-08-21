import { frontRoutes } from '@/shared/config/routes/frontRoutes'

const pagesList = Object.keys(frontRoutes.pages)

export const appRouterRoutes = pagesList.map((page) => ({
  ...frontRoutes.pages[page],
  lazy: async () => ({
    Component: (await import(/* @vite-ignore */ `../../pages/${page}`)).default,
  }),
}))
