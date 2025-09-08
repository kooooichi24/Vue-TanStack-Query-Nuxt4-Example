import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const commentQueryKeys = createQueryKeys('comments', {
  list: null,
  search: (filters: MaybeRefOrGetter<{ postId?: number }>) => [filters],
  get: (id: MaybeRefOrGetter<number>) => [id],
})

export function useListComments() {
  return useQuery({
    queryKey: commentQueryKeys.list.queryKey,
    queryFn: async (): Promise<Comment[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      return response.json()
    },
  })
}

export function useSearchComments(filters: MaybeRefOrGetter<{ postId?: number }>) {
  return useQuery({
    queryKey: commentQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Comment[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${toValue(filters).postId}`)
      return response.json()
    },
  })
}

export function useGetComment(id: MaybeRefOrGetter<number>) {
  return useQuery({
    queryKey: commentQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Comment> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${toValue(id)}`)
      return response.json()
    },
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { postId: number, name: string, email: string, body: string }): Promise<Comment> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryKeys._def })
    },
  })
}

export function useUpdateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, name?: string, email?: string, body?: string }): Promise<Comment> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.name !== undefined && { name: request.name }),
          ...(request.email !== undefined && { email: request.email }),
          ...(request.body !== undefined && { body: request.body }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryKeys._def })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryKeys._def })
    },
  })
}
