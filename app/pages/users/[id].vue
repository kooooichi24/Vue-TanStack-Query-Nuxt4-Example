<template>
  <div class="h-full flex flex-col p-6">
    <h1 class="text-2xl font-bold">User {{ userId }}</h1>

    <div v-if="isLoadingUser" class="py-6 rounded-lg shadow">
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
    
    <div v-else-if="user" class="py-6 rounded-lg shadow">
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

    <UTable
      :data="postsWithUsername"
      :columns="columns"
      :loading="isLoadingPosts"
      class="mt-6 cursor-pointer border border-(--ui-border-accented) rounded-lg overflow-auto"
      sticky
      @select="(row: TableRow<TableData>) => navigateTo(`/posts/${row.original.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import { useSearchPosts, type Post } from '~/features/posts/queries'
import { useGetUser, type User } from '~/features/users/queries'

const route = useRoute()
const userId = computed(() => parseInt(route.params.id as string))

const { data: user, isLoading: isLoadingUser } = useGetUser(userId)

const searchPostsParams = computed(() => ({ userId: userId.value }))
const { data: posts, isLoading: isLoadingPosts } = useSearchPosts(searchPostsParams)


type TableData = Post & Pick<User, 'username'>

const columns: TableColumn<TableData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'body', header: 'Body' },
]

const postsWithUsername = computed(() => {
  if (!posts.value) return []
  return posts.value?.map((post) => ({
    ...post,
    username: user.value?.username ?? ""
  }))
})

</script>