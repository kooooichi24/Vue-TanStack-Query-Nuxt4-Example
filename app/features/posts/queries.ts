import { useQuery } from "@tanstack/vue-query";
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

