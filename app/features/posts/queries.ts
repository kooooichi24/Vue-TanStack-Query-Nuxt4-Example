import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const postQueryKeys = createQueryKeys('posts', {
  list: null,
  get: (id: string) => [id],
})

export async function useListPosts() {
  return useQuery({
    queryKey: postQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts'),
  })
}

export async function useGetPost(id: string) {
  return useQuery({
    queryKey: postQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
}
