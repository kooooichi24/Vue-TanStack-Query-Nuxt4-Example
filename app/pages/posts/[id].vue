<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Post {{ postId }}</h1>

    <div v-if="isLoading" class="text-gray-600">
      Loading...
    </div>
    
    <div v-else-if="data" class="p-6 rounded-lg shadow">
      <p>ID: {{ data.id }}</p>
      <p>Title: {{ data.title }}</p>
      <p>Body: {{ data.body }}</p>
      <p>User ID: {{ data.userId }}</p>
      <p>Username: {{ data.username }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { userQueryKeys } from '~/features/users/queries'
import type { TableData } from './index.vue'

const route = useRoute()
const postId = parseInt(route.params.id as string)

async function useGetPostDetail(id: number) {
  return useQuery({
    queryKey: userQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<TableData> => {
      const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
      const user = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json())
      return {
        ...post,
        username: user.username
      }
    },
  })
}

// const { data: post, isLoading: isLoadingPost } = await useGetPost(postId)
// const { data: user, isLoading: isLoadingUser } = await useGetUser(post.value?.userId)

// const isLoading = computed(() => isLoadingPost.value || isLoadingUser.value)

const { data, isLoading } = await useGetPostDetail(postId)

</script>