import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const postQueryKeys = createQueryKeys('posts', {
  list: null,
  listByUserId: (userId: number) => [userId],
  listByUserIds: (userIds: number[]) => [userIds],
  get: (id: number) => [id],
})

export async function useListPosts() {
  return useQuery({
    queryKey: postQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts'),
  })
}

export async function useListPostsByUserId(userId: number) {
  return useQuery({
    queryKey: postQueryKeys.listByUserId(userId).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
  })
}

export async function useListPostsByUserIds(userIds: number[]) {
  return useQuery({
    queryKey: postQueryKeys.listByUserIds(userIds).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?${userIds.map(userId => `userId=${userId}`).join('&')}`),
  })
}

export async function useGetPost(id: number) {
  return useQuery({
    queryKey: postQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
  })
}
