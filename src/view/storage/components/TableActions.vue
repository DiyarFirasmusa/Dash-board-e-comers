<script setup lang="ts">
import { QueryKeys, Customer, Permissions } from '../types';
import GlobalTableActions from '@/components/table/GlobalTableActions.vue';
import { useDelete } from '@/composable/useDelete';
import { useStore } from '../stores';
import { useQueryClient } from '@tanstack/vue-query';
import { URL } from '../';
import { useI18n } from 'vue-i18n';

const props = defineProps<Customer>()
const store = useStore();
const { t } = useI18n();
const deleteDialog = useDelete();
const queryClient = useQueryClient();
const deleteCallback = (item: Customer) => {
  deleteDialog.showDialog(URL, item.id, () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.getAll] })
  }, t('Are you sure you want to delete customer : ') + item.title);
}
const editCallback = (item: Customer) => {
  
  store.openEditDialog(item.id)
}

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>

<template>
  <GlobalTableActions :permissions="Permissions" :item="props" :editCallback="editCallback"
    :deleteCallback="deleteCallback"  />
</template>
