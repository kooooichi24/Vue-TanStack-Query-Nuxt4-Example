import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

export const photoQueryKeys = createQueryKeys('photos', {
  list: null,
  search: (filters: { albumId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListPhotos() {
  return useQuery({
    queryKey: photoQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/photos'),
  })
}

export async function useSearchPhotos(filters: { albumId?: number }) {
  return useQuery({
    queryKey: photoQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${filters.albumId}`),
  })
}

export async function useGetPhoto(id: number) {
  return useQuery({
    queryKey: photoQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/photos/${id}`),
  })
}
