import { useQuery } from "@tanstack/vue-query";

export async function useListPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts'),
  })
}

export async function useGetPost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
}
