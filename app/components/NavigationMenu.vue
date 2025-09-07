<template>
  <UNavigationMenu orientation="horizontal" :items="items" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home Page',
      type: 'link',
      to: '/',
    },
    {
      label: 'Posts Page',
      type: 'link',
      to: '/posts',
    },
    {
      label: 'Users Page',
      type: 'link',
      to: '/users',
    },
  ]
])
</script>
