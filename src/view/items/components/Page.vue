<script setup lang="ts">
import Table from '@/components/table/Table.vue';
import Dialog from '../components/Dialog.vue'
import AppCrud from '@/components/app-crud/AppCrud.vue';
import { columns, mainFilters } from '../';
import { useQuery } from '@tanstack/vue-query';
import { QueryKeys, Permissions } from '../types';
import $api_public from '@/api/api-public';
import { Button } from '@/components/ui/button';
import { useRoute } from 'vue-router';
import { useStore } from '../stores';
import { ref } from 'vue';
import { Client } from '@/api/client';
import { URL } from '../';
import { useTableStore } from '@/stores/table';
const route = useRoute()
const store = useStore();
const tableStore = useTableStore();
const visibleCoulmns = computed(() => {
  if ((columns.at(-1) as any).accessorKey == 'actions' && !tableStore.viewActions(Permissions)) {
    columns.pop();
  }
  return columns;
})

const getData = async () => {
  
  return (await Client.get<any>(URL, tableStore.options, route.query))
}

const { data, isLoading, refetch } = useQuery({
  queryKey: [QueryKeys.getAll],
  queryFn: getData,
})
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>
<template>
    <AppCrud :mainFilter="mainFilters" :fetchFn="refetch" v-if="authStore.hasPermission('products.view')">
      <template #actions >      
          <Button @click="store.openCreateDialog()" v-if="authStore.hasPermission('products.create')">
            {{ $t("Add") }}
            <icon icon="tabler-circle-plus" />
          </Button> 
      </template>
      <Table @options="() => refetch()"
        :columns="visibleCoulmns"
        :current-page="data?.currentPage ?? 1"
        :total-pages="data?.totalPages ?? 1"
        :total-count="data?.totalCount ?? 0"
        :data="data?.data" :isLoading >
      </Table>
      <Dialog @refresh="refetch" />
      </AppCrud>
</template>
