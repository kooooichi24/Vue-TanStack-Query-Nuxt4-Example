import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

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

export function useListAlbums() {
  return useQuery({
    queryKey: albumsQueryKeys.list.queryKey,
    queryFn: async (): Promise<Album[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums')
      return response.json()
    },
  })
}

export function useSearchAlbums(filters: { userId?: number }) {
  return useQuery({
    queryKey: albumsQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Album[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${filters.userId}`)
      return response.json()
    },
  })
}

export function useGetAlbum(id: number) {
  return useQuery({
    queryKey: albumsQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Album> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      return response.json()
    },
  })
}

export function useCreateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { userId: number, title: string }): Promise<Album> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumsQueryKeys._def })
    },
  })
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, title?: string }): Promise<Album> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.title !== undefined && { title: request.title }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumsQueryKeys._def })
    },
  })
}

export function useDeleteAlbum() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumsQueryKeys._def })
    },
  })
}
