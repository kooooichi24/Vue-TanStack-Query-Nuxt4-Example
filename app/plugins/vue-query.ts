import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})