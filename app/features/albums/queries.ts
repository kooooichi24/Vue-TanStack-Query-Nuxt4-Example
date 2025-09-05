import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const albumsQueryKeys = createQueryKeys('albums', {
  list: null,
  search: (filters: { userId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListAlbums() {
  return useQuery({
    queryKey: albumsQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/albums'),
  })
}

export async function useSearchAlbums(filters: { userId?: number }) {
  return useQuery({
    queryKey: albumsQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/albums?userId=${filters.userId}`),
  })
}

export async function useGetAlbum(id: number) {
  return useQuery({
    queryKey: albumsQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/albums/${id}`),
  })
}
