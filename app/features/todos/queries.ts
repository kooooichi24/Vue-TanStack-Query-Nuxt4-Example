import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const todoQueryKeys = createQueryKeys('todos', {
  list: null,
  listByUserId: (userId: number) => [userId],
  listByUserIds: (userIds: number[]) => [userIds],
  get: (id: number) => [id],
})

export async function useListTodos() {
  return useQuery({
    queryKey: todoQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos'),
  })
}

export async function useListTodosByUserId(userId: number) {
  return useQuery({
    queryKey: todoQueryKeys.listByUserId(userId).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
  })
}

export async function useListTodosByUserIds(userIds: number[]) {
  return useQuery({
    queryKey: todoQueryKeys.listByUserIds(userIds).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/todos?${userIds.map(userId => `userId=${userId}`).join('&')}`),
  })
}

export async function useGetTodo(id: number) {
  return useQuery({
    queryKey: todoQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
  })
}
