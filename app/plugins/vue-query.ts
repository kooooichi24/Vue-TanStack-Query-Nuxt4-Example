import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        // SSR対応
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

  // VueQueryPluginを設定
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})