import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
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

export async function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { name: string, username: string, email: string, address: { street: string, suite: string, city: string, zipcode: string, geo: { lat: string, lng: string } }, phone: string, website: string, company: { name: string, catchPhrase: string, bs: string } }): Promise<User> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys._def })
    },
  })
}

export async function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: { id: number, name?: string, username?: string, email?: string, address?: { street: string, suite: string, city: string, zipcode: string, geo: { lat: string, lng: string } }, phone?: string, website?: string, company?: { name: string, catchPhrase: string, bs: string } }): Promise<User> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${request.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...(request.name !== undefined && { name: request.name }),
          ...(request.username !== undefined && { username: request.username }),
          ...(request.email !== undefined && { email: request.email }),
          ...(request.address !== undefined && { address: request.address }),
          ...(request.phone !== undefined && { phone: request.phone }),
          ...(request.website !== undefined && { website: request.website }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys._def })
    },
  })
}

export async function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys._def })
    },
  })
}
