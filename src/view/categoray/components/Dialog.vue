<script setup lang="ts">
import AppFormDialog from '@/components/app-crud/AppFormDialog.vue';
import { useStore } from '../stores';
import { QueryKeys, Customer } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import AppFormTextInput from '@/components/form/AppFormTextInput.vue';
import { string } from 'yup';
import { Client } from '@/api/client';
import { isPhoneNumber } from '@/utils/validators';
import { useToast } from '@/components/ui/toast';
import { URL } from '../';

const customer = ref<Partial<Customer>>({});
const { toast } = useToast();

const store = useStore();
const queryClient = useQueryClient();



const isDialogOpen = computed({
  get: () => store.isEditDialogOpen || store.isCreateDialogOpen,
  set: (v: boolean) => {
    customer.value = {};
    store.isEditDialogOpen = v
    store.isCreateDialogOpen = v;
  }
})

const getData = async () => {
  const data = await Client.getSingle<Customer>(URL, store.selectedId)
  customer.value = data;
  return data;
}

const cleanup = () => {
  customer.value = {};
  queryClient.invalidateQueries({
    queryKey: [QueryKeys.getAll]
  })
  isDialogOpen.value = false;
}

const create = async () => {
  console.log('dd')
  await Client.create<Customer>(URL, customer.value as Customer);
  
  toast({
    title: 'Success',
    description: 'customer created successfully',
    variant: 'default'
  })
  cleanup();
  return customer.value;
}


const isEdit = computed(() => store.isEditDialogOpen)

const title = computed(() => {
  return (store.isEditDialogOpen ? 'Edit' : 'Create') + ' Customer'
})

const { mutate: createMutation, isPending: createPending } = useMutation({
  mutationKey: [QueryKeys.create],
  mutationFn: create
})

const { isFetching: getPending } = useQuery({
  queryKey: [QueryKeys.getSingle, store.selectedId ?? ''],
  queryFn: getData,
  enabled: isEdit
})

const onSubmit = () => {
    createMutation();
}

</script>
<template>
  <AppFormDialog v-model="isDialogOpen" :isLoading="createPending || updatePending || getPending" :title size="md"
    @submit="onSubmit">
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.title" name="title" type="text" label="Title" placeholder="Enter title"
        :validation="string().required()" />
      <div />
      <AppFormTextInput v-model="customer.creationDate" name="creationDate" type="text" label="creation Date"
        placeholder="Enter creationDate" :validation="string().required()" />
    </div>
  </AppFormDialog>
</template>
