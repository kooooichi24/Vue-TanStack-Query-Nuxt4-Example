import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const commentQueryKeys = createQueryKeys('comments', {
  list: null,
  get: (id: string) => [id],
})

export async function useListComments() {
  return useQuery({
    queryKey: commentQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/comments'),
  })
}

export async function useGetComment(id: string) {
  return useQuery({
    queryKey: commentQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments/${id}`),
  })
}
