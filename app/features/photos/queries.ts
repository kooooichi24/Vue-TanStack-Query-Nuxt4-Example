import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const photoQueryKeys = createQueryKeys('photos', {
  list: null,
  listByAlbumId: (albumId: number) => [albumId],
  listByAlbumIds: (albumIds: number[]) => [albumIds],
  get: (id: number) => [id],
})

export async function useListPhotos() {
  return useQuery({
    queryKey: photoQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/photos'),
  })
}

export async function useListPhotosByAlbumId(albumId: number) {
  return useQuery({
    queryKey: photoQueryKeys.listByAlbumId(albumId).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`),
  })
}

export async function useListPhotosByAlbumIds(albumIds: number[]) {
  return useQuery({
    queryKey: photoQueryKeys.listByAlbumIds(albumIds).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/photos?${albumIds.map(albumId => `albumId=${albumId}`).join('&')}`),
  })
}

export async function useGetPhoto(id: number) {
  return useQuery({
    queryKey: photoQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/photos/${id}`),
  })
}
