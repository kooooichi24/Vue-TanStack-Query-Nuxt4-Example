import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export const todoQueryKeys = createQueryKeys('todos', {
  list: null,
  search: (filters: MaybeRefOrGetter<{ userIds?: number[] }>) => [filters],
  get: (id: MaybeRefOrGetter<number>) => [id],
})

export function useListTodos() {
  return useQuery({
    queryKey: todoQueryKeys.list.queryKey,
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      return response.json()
    },
  })
}

export function useSearchTodos(filters: MaybeRefOrGetter<{ userIds?: number[] }>) {
  return useQuery({
    queryKey: todoQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?${toValue(filters).userIds?.map(userId => `userId=${userId}`).join('&')}`)
      return response.json()
    },
  })
}

export function useGetTodo(id: MaybeRefOrGetter<number>) {
  return useQuery({
    queryKey: todoQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Todo> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${toValue(id)}`)
      return response.json()
    },
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { userId: number, title: string, completed: boolean }): Promise<Todo> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys._def })
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, title?: string, completed?: boolean }): Promise<Todo> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.title !== undefined && { title: request.title }),
          ...(request.completed !== undefined && { completed: request.completed }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys._def })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys._def })
    },
  })
}
