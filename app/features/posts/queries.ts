import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export const postQueryKeys = createQueryKeys('posts', {
  list: null,
  search: (filters: { userId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListPosts() {
  return useQuery({
    queryKey: postQueryKeys.list.queryKey,
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return response.json()
    },
  })
}

export async function useSearchPosts(filters: { userId?: number }) {
  return useQuery({
    queryKey: postQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${filters.userId}`)
      return response.json()
    },
  })
}

export async function useGetPost(id: number) {
  return useQuery({
    queryKey: postQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Post> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      return response.json()
    },
  })
}

export async function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { title: string, body: string, userId: number }): Promise<Post> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys._def })
    },
  })
}

export async function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, title?: string, body?: string }): Promise<Post> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.title !== undefined && { title: request.title }),
          ...(request.body !== undefined && { body: request.body }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys._def })
    },
  })
}

export async function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys._def })
    },
  })
}
