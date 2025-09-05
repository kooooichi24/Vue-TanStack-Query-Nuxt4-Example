import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const commentQueryKeys = createQueryKeys('comments', {
  list: null,
  search: (filters: { postId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListComments() {
  return useQuery({
    queryKey: commentQueryKeys.list.queryKey,
    queryFn: async (): Promise<Comment[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      return response.json()
    },
  })
}

export async function useSearchComments(filters: { postId?: number }) {
  return useQuery({
    queryKey: commentQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Comment[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${filters.postId}`)
      return response.json()
    },
  })
}

export async function useGetComment(id: number) {
  return useQuery({
    queryKey: commentQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Comment> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
      return response.json()
    },
  })
}
