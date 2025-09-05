import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const commentQueryKeys = createQueryKeys('comments', {
  list: null,
  listByPostId: (postId: number) => [postId],
  listByPostIds: (postIds: number[]) => [postIds],
  get: (id: number) => [id],
})

export async function useListComments() {
  return useQuery({
    queryKey: commentQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/comments'),
  })
}

export async function useListCommentsByPostId(postId: number) {
  return useQuery({
    queryKey: commentQueryKeys.listByPostId(postId).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
  })
}

export async function useListCommentsByPostIds(postIds: number[]) {
  return useQuery({
    queryKey: commentQueryKeys.listByPostIds(postIds).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments?${postIds.map(postId => `postId=${postId}`).join('&')}`),
  })
}

export async function useGetComment(id: number) {
  return useQuery({
    queryKey: commentQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments/${id}`),
  })
}
