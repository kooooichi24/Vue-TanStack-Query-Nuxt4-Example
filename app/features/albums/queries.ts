import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const albumsQueryKeys = createQueryKeys('albums', {
  list: null,
  listByUserId: (userId: number) => [userId],
  listByUserIds: (userIds: number[]) => [userIds],
  get: (id: number) => [id],
})

export async function useListAlbums() {
  return useQuery({
    queryKey: albumsQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/albums'),
  })
}

export async function useListAlbumsByUserId(userId: number) {
  return useQuery({
    queryKey: albumsQueryKeys.listByUserId(userId).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
  })
}

export async function useListAlbumsByUserIds(userIds: number[]) {
  return useQuery({
    queryKey: albumsQueryKeys.listByUserIds(userIds).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/albums?${userIds.map(userId => `userId=${userId}`).join('&')}`),
  })
}

export async function useGetAlbum(id: number) {
  return useQuery({
    queryKey: albumsQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/albums/${id}`),
  })
}
