import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export const todoQueryKeys = createQueryKeys('todos', {
  list: null,
  search: (filters: { userIds?: number[] }) => [filters],
  get: (id: number) => [id],
})

export async function useListTodos() {
  return useQuery({
    queryKey: todoQueryKeys.list.queryKey,
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      return response.json()
    },
  })
}

export async function useSearchTodos(filters: { userIds?: number[] }) {
  return useQuery({
    queryKey: todoQueryKeys.search(filters).queryKey,
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?${filters.userIds?.map(userId => `userId=${userId}`).join('&')}`)
      return response.json()
    },
  })
}

export async function useGetTodo(id: number) {
  return useQuery({
    queryKey: todoQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<Todo> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      return response.json()
    },
  })
}
