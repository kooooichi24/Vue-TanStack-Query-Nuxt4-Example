import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { defineNuxtPlugin } from 'nuxt/app'

export const DEFAULT_QUERIES_OPTIONS = {
  staleTime: 1000 * 60 * 5,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
}

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: DEFAULT_QUERIES_OPTIONS,
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})