import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const todoQueryKeys = createQueryKeys('todos', {
  list: null,
  search: (filters: { userIds?: number[] }) => [filters],
  get: (id: number) => [id],
})

export async function useListTodos() {
  return useQuery({
    queryKey: todoQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos'),
  })
}

export async function useSearchTodos(filters: { userIds?: number[] }) {
  return useQuery({
    queryKey: todoQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/todos?${filters.userIds?.map(userId => `userId=${userId}`).join('&')}`),
  })
}

export async function useGetTodo(id: number) {
  return useQuery({
    queryKey: todoQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
  })
}
