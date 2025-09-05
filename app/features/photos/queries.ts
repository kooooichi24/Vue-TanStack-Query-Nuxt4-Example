import { createQueryKeys } from "@lukemorales/query-key-factory"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

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

export async function useCreatePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { albumId: number, title: string, url: string, thumbnailUrl: string }): Promise<Photo> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: photoQueryKeys._def })
    },
  })
}

export async function useUpdatePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, title?: string, url?: string, thumbnailUrl?: string }): Promise<Photo> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.title !== undefined && { title: request.title }),
          ...(request.url !== undefined && { url: request.url }),
          ...(request.thumbnailUrl !== undefined && { thumbnailUrl: request.thumbnailUrl }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: photoQueryKeys._def })
    },
  })
}

export async function useDeletePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: photoQueryKeys._def })
    },
  })
}
