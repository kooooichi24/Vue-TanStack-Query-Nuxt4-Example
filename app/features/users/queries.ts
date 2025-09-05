import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userQueryKeys = createQueryKeys('users', {
  list: null,
  search: (filters: { usernames?: string[], emails?: string[] }) => [filters],
  get: (id: number) => [id],
})

export async function useListUsers() {
  return useQuery({
    queryKey: userQueryKeys.list.queryKey,
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/users'),
  })
}

export async function useSearchUsers(filters: { usernames?: string[], emails?: string[] }) {
  const queryParams = new URLSearchParams();
  if (filters.usernames) {
    filters.usernames.forEach(username => queryParams.append('username', username));
  }
  if (filters.emails) {
    filters.emails.forEach(email => queryParams.append('email', email));
  }

  return useQuery({
    queryKey: userQueryKeys.search(filters).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users?${queryParams.toString()}`),
  })
}

export async function useGetUser(id: number) {
  return useQuery({
    queryKey: userQueryKeys.get(id).queryKey,
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
  })
}
