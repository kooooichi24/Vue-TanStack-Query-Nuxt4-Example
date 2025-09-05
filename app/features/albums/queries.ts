import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useQuery } from "@tanstack/vue-query"

type Album = {
  id: number
  userId: number
  title: string
}

export const albumsQueryKeys = createQueryKeys('albums', {
  list: null,
  search: (filters: { userId?: number }) => [filters],
  get: (id: number) => [id],
})

export async function useListAlbums() {
  return useQuery({
    queryKey: albumsQueryKeys.list.queryKey,
    queryFn: async (): Promise<Album[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums')
      return response.json()
    },
  })
}

export async function useSearchAlbums(filters: { userId?: number }) {
  return useQuery({
    queryKey: albumsQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Album[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${filters.userId}`)
      return response.json()
    },
  })
}

export async function useGetAlbum(id: number) {
  return useQuery({
    queryKey: albumsQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Album> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      return response.json()
    },
  })
}
