import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const commentQueryKeys = createQueryKeys('comments', {
  list: null,
  search: (filters: { postId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListComments() {
  return useQuery({
    queryKey: commentQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/comments'),
  })
}

export async function useSearchComments(filters: { postId?: number }) {
  return useQuery({
    queryKey: commentQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${filters.postId}`),
  })
}

export async function useGetComment(id: number) {
  return useQuery({
    queryKey: commentQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments/${id}`),
  })
}
