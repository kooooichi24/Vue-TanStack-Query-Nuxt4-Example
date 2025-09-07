<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Post: ID {{ postId }}</h1>

    <div v-if="isLoadingPost" class="text-gray-600">Loading...</div>
    
    <div v-else-if="post && user" class="p-6 rounded-lg shadow">
      <p>ID: {{ post.id }}</p>
      <p>Title: {{ post.title }}</p>
      <p>Body: {{ post.body }}</p>
      <p>User ID: {{ post.userId }}</p>
    </div>

    <h1 class="text-2xl font-bold">Related User: ID {{ userId }}</h1>

    <div v-if="isLoadingUser" class="text-gray-600">Loading...</div>
    
    <div v-else-if="user" class="p-6 rounded-lg shadow">
      <p>ID: {{ user.id }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Website: {{ user.website }}</p>
      <p>Address: {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
      <p>Company: {{ user.company.name }}, {{ user.company.catchPhrase }}, {{ user.company.bs }}</p>
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

</script>
