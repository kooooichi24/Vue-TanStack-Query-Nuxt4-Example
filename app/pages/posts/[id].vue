<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Post {{ postId }}</h1>

    <div v-if="isLoadingPost" class="py-6 rounded-lg shadow">
      <UCard>
        <div class="space-y-3">
          <USkeleton class="h-4 w-12" />
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-16" />
        </div>
      </UCard>
    </div>
    
    <div v-else-if="post" class="py-6 rounded-lg shadow">
      <UCard>
        <p>ID: {{ post.id }}</p>
        <p>Title: {{ post.title }}</p>
        <p>Body: {{ post.body }}</p>
        <p>User ID: {{ post.userId }}</p>
      </UCard>
    </div>

    <h1 class="text-2xl font-bold">Related User{{ post?.userId }}</h1>

    <div v-if="isLoadingUser" class="py-6 rounded-lg shadow">
      <UCard>
        <div class="space-y-3">
          <USkeleton class="h-4 w-12" />
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-16" />
        </div>
      </UCard>
    </div>
    
    <div v-else-if="user" class="py-6 rounded-lg shadow">
      <UCard class="cursor-pointer hover:bg-gray-800" @click="navigateTo(`/users/${user.id}`)" >
        <p>ID: {{ user.id }}</p>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
        <p>Website: {{ user.website }}</p>
        <p>Address: {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
        <p>Company: {{ user.company.name }}, {{ user.company.catchPhrase }}, {{ user.company.bs }}</p>
      </UCard>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useGetUser } from '~/features/users/queries'
import { useGetPost } from '~/features/posts/queries'

const route = useRoute()
const postId = parseInt(route.params.id as string)

const { data: post, isLoading: isLoadingPost } = useGetPost(postId)
const { data: user, isLoading: isLoadingUser } = useGetUser(() => post.value?.userId)

</script>
