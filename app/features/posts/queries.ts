import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const postQueryKeys = createQueryKeys('posts', {
  list: null,
  search: (filters: { userId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListPosts() {
  return useQuery({
    queryKey: postQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts'),
  })
}

export async function useSearchPosts(filters: { userId?: number }) {
  return useQuery({
    queryKey: postQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${filters.userId}`),
  })
}

export async function useGetPost(id: number) {
  return useQuery({
    queryKey: postQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
}
