<template>
  <div>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <!-- We can assume by this point that `isSuccess === true` -->
    <ul v-else>
      <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
    </ul>
    <button @click="onButtonClick">Add Post</button>
  </div>
</template>

<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

// Access QueryClient instance
const queryClient = useQueryClient()

// Query
const { isPending, isError, data, error } = useQuery({
  queryKey: ['posts'],
  queryFn: () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
  },
})

// Mutation
const mutation = useMutation({
  mutationFn: () => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    })
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})

function onButtonClick() {
  mutation.mutate({
    id: Date.now(),
    title: 'Do Laundry',
  })
}
</script>