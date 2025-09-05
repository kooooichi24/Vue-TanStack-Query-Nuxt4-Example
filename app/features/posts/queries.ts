import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const postKeys = createQueryKeys('posts', {
  list: null,
  get: (id: string) => [id],
})

export const postQueryKeys = postKeys

export async function useListPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts'),
  })
}

export async function useGetPost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
}
