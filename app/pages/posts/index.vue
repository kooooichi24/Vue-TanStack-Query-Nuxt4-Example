<template>
  <div class="h-screen flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-4">Posts</h1>

    <UTable
      :data="data"
      :columns="columns"
      :loading="isLoading"
      class="cursor-pointer border border-(--ui-border-accented) rounded-lg"
      @select="onRowSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';
import { useListPosts, type Post } from '~/features/posts/queries'
import { useListUsers, type User } from '~/features/users/queries';

const { data: posts, isLoading: isLoadingPosts } = await useListPosts()
const { data: users, isLoading: isLoadingUsers } = await useListUsers()

const isLoading = computed(() => isLoadingPosts.value || isLoadingUsers.value)

type TableData =Post & Pick<User, 'username'>

const columns: TableColumn<TableData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'body', header: 'Body' },
]

const data = computed(() => {
  if (!posts.value || !users.value) return []

  const userMap = new Map(users.value.map((user) => [user.id, user]))
  return posts.value?.map((post) => ({
    ...post,
    username: userMap.get(post.userId)?.username ?? ""
  }))
})

const onRowSelect = (row: TableRow<TableData>) => {
  navigateTo(`/posts/${row.original.id}`)
}

</script>

<style scoped>
</style>
