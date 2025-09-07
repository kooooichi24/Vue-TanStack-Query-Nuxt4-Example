<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">User {{ userId }}</h1>

    <div v-if="isLoadingUser" class="text-gray-600">Loading...</div>
    
    <div v-else-if="user" class="p-6 rounded-lg shadow">
      <UCard>
        <p><strong>ID: </strong>{{ user.id }}</p>
        <p><strong>Username: </strong>{{ user.username }}</p>
        <p><strong>Email: </strong>{{ user.email }}</p>
        <p><strong>Phone: </strong>{{ user.phone }}</p>
        <p><strong>Website: </strong>{{ user.website }}</p>
        <p><strong>Address: </strong>{{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
        <p><strong>Company: </strong>{{ user.company.name }}, {{ user.company.catchPhrase }}, {{ user.company.bs }}</p>
      </UCard>
    </div>

    <h1 class="text-2xl font-bold">Related Posts</h1>

    <div v-if="isLoadingPosts" class="text-gray-600">Loading...</div>
    
    <div v-else-if="posts" class="p-6 rounded-lg shadow">
      <UCard v-for="post in posts" :key="post.id" class="mb-4">
        <p><strong>ID: </strong>{{ post.id }}</p>
        <p><strong>Title: </strong>{{ post.title }}</p>
        <p><strong>Body: </strong>{{ post.body }}</p>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchPosts } from '~/features/posts/queries'
import { useGetUser } from '~/features/users/queries'

const route = useRoute()
const userId = computed(() => parseInt(route.params.id as string))

const { data: user, isLoading: isLoadingUser } = await useGetUser(userId)

const searchPostsParams = computed(() => ({ userId: userId.value }))
const { data: posts, isLoading: isLoadingPosts } = await useSearchPosts(searchPostsParams)

</script>