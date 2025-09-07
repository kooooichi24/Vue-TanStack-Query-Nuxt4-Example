<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Users</h1>

    <UTable
      :data="data"
      :columns="columns"
      :loading="isLoading"
      class="cursor-pointer border border-(--ui-border-accented) rounded-lg"
      @select="onRowSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';
import { useListUsers, type User } from '~/features/users/queries';

const { data, isLoading } = await useListUsers()

const columns: TableColumn<User>[] = [
  { 
    accessorKey: 'id',
    header: 'ID' 
  },
  { 
    accessorKey: 'name',
    header: 'Name'
  },
  { 
    accessorKey: 'username',
    header: 'Username'
  },
  { 
    accessorKey: 'email',
    header: 'Email' 
  },
  { 
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.getValue("address") as User["address"]
      return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
    }
  },
  { 
    accessorKey: 'phone',
    header: 'Phone' 
  },
  { 
    accessorKey: 'website',
    header: 'Website' 
  },
  { 
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => {
      const company = row.getValue("company") as User["company"]
      return `${company.name}, ${company.catchPhrase}, ${company.bs}`
    }
  },
]

const onRowSelect = (row: TableRow<User>) => {
  navigateTo(`/users/${row.original.id}`)
}

</script>

<style scoped>
</style>
