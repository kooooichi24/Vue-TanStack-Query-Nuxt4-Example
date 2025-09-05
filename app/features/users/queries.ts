import { useQuery } from "@tanstack/vue-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";

type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const userQueryKeys = createQueryKeys('users', {
  list: null,
  search: (filters: { usernames?: string[], emails?: string[] }) => [filters],
  get: (id: number) => [id],
})

export async function useListUsers() {
  return useQuery({
    queryKey: userQueryKeys.list.queryKey,
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return response.json()
    },
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
    queryFn: async (): Promise<User[]> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?${queryParams.toString()}`)
      return response.json()
    },
  })
}

export async function useGetUser(id: number) {
  return useQuery({
    queryKey: userQueryKeys.get(id).queryKey,
    queryFn: async (): Promise<User> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      return response.json()
    },
  })
}
