<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Post {{ postId }}</h1>

    <div v-if="isLoading" class="text-gray-600">
      Loading...
    </div>
    
    <div v-else-if="post && user" class="p-6 rounded-lg shadow">
      <p>ID: {{ post.id }}</p>
      <p>Title: {{ post.title }}</p>
      <p>Body: {{ post.body }}</p>
      <p>User ID: {{ post.userId }}</p>
      <p>Username: {{ user.username }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useGetUser } from '~/features/users/queries'
import { useGetPost } from '~/features/posts/queries'

const route = useRoute()
const postId = parseInt(route.params.id as string)

const { data: post, isLoading: isLoadingPost } = await useGetPost(postId)
const userId = computed(() => post.value?.userId)
const { data: user, isLoading: isLoadingUser } = await useGetUser(userId)

const isLoading = computed(() => isLoadingPost.value || isLoadingUser.value)

</script>