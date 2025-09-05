import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

type Photo = {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

export const photoQueryKeys = createQueryKeys('photos', {
  list: null,
  search: (filters: { albumId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListPhotos() {
  return useQuery({
    queryKey: photoQueryKeys.list.queryKey,
    queryFn: async (): Promise<Photo[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos')
      return response.json()
    },
  })
}

export async function useSearchPhotos(filters: { albumId?: number }) {
  return useQuery({
    queryKey: photoQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Photo[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${filters.albumId}`)
      return response.json()
    },
  })
}

export async function useGetPhoto(id: number) {
  return useQuery({
    queryKey: photoQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Photo> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      return response.json()
    },
  })
}
