<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">User {{ userId }}</h1>

    <div v-if="isLoadingUser" class="p-6 rounded-lg shadow">
      <UCard>
        <div class="space-y-3">
          <USkeleton class="h-4 w-16" />
          <USkeleton class="h-4 w-32" />
          <USkeleton class="h-4 w-48" />
          <USkeleton class="h-4 w-40" />
          <USkeleton class="h-4 w-36" />
          <USkeleton class="h-4 w-64" />
          <USkeleton class="h-4 w-56" />
        </div>
      </UCard>
    </div>
    
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

    <div v-if="isLoadingPosts" class="p-6 rounded-lg shadow">
      <UCard v-for="n in 3" :key="n" class="mb-4">
        <div class="space-y-3">
          <USkeleton class="h-4 w-12" />
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-16" />
        </div>
      </UCard>
    </div>
    
    <div v-else-if="posts" class="p-6 rounded-lg shadow">
      <UCard v-for="post in posts" :key="post.id" class="mb-4 cursor-pointer hover:bg-gray-800" @click="navigateTo(`/posts/${post.id}`)">
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

const { data: user, isLoading: isLoadingUser } = useGetUser(userId)

const searchPostsParams = computed(() => ({ userId: userId.value }))
const { data: posts, isLoading: isLoadingPosts } = useSearchPosts(searchPostsParams)

</script>