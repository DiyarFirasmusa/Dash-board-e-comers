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
import AppSelectField from '../../../components/fields/AppSelectField.vue'
import { useTableStore } from '@/stores/table';
import { useRoute } from 'vue-router';

const route = useRoute()
const tableStore = useTableStore();
const emit =  defineEmits(['refresh'])

const customer = ref({
  name: '',
  price: 0, 
  img: '',
  colors: [{
    name: '',
    hexColor: '',
    sizes: [{
      number: 0, 
      count: 0, 
    }],
  }],
  categoryId: '',
  storageId: '',
});
const { toast } = useToast();

const store = useStore();
const queryClient = useQueryClient();

const selectedIdCatgoray = ref(null);
const getDataCatgoray = async () => {
    return (await Client.get<any>('/category'))
}

const { data: dataCatogray } = useQuery({
    queryKey: ["category"],
    queryFn: getDataCatgoray,
})

const selectedIdStorage = ref(null)
const getDataStorage  = async () => {
  return (await Client.get<any>('/storage'))
}
const { data: dataStorage } = useQuery({
    queryKey: ["storage"],
    queryFn: getDataStorage,
})

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
  console.log(customer.value)
  customer.value = data;
  return data;
}


const cleanup = () => {
  customer.value = {
    name: '',
    price: 0,
    img: '',
    colors: [{
      name: '',
      hexColor: '',
      sizes: [{
        number: 0,
        count: 0,
      }],
    }],
    categoryId: '',
    storageId: '',
  };
  queryClient.invalidateQueries({
    queryKey: [QueryKeys.getAll]
  });
  isDialogOpen.value = false;
};

const create = async () => {
  
  customer.value.price = Number(customer.value.price);
  customer.value.colors[0].sizes[0].number = Number(customer.value.colors[0].sizes[0].number);
  customer.value.colors[0].sizes[0].count = Number(customer.value.colors[0].sizes[0].count);

  await Client.create<Customer>(URL, customer.value as Customer);
  toast({
    title: 'Success',
    description: 'Customer created successfully',
    variant: 'default'
  });
  cleanup();
  emit('refresh');
};

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
  <AppFormDialog v-model="isDialogOpen" :isLoading="createPending || updatePending || getPending" :title="title" size="md"
    @submit="onSubmit">
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.name" name="name" type="text" label="Name" placeholder="Enter name"
        :validation="string().required()" />
      <AppSelectField
        :items="dataCatogray?.data"
        itemLabel="title"
        itemValue="id"
        placeholder="Select a category"
        v-model="customer.categoryId"
      />
    </div>
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.price" name="price" type="number" label="Price" placeholder="Enter price"
        :validation="string().required()" />
      <AppSelectField
        :items="dataStorage?.data"
        itemLabel="title"
        itemValue="id"
        placeholder="Select a storage"
        v-model="customer.storageId"
      />
    </div>
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.img" name="img" type="text" label="Img" placeholder="Enter img"
        :validation="string().required()" />
      <AppFormTextInput v-model="customer.colors[0].name" name="nameColor" type="text" label="Name Color" placeholder="Enter name color"
        :validation="string().required()" />
    </div>
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.colors[0].hexColor" name="hexColor" type="text" label="Hex Color" placeholder="Enter hex color"
        :validation="string().required()" />
      <AppFormTextInput v-model="customer.colors[0].sizes[0].number" name="sizeNumber" type="number" label="Size Number" placeholder="Enter size number"
        :validation="string().required()" />
    </div>
    <div class="grid grid-cols- md:grid-cols-2 gap-3 px-1">
      <AppFormTextInput v-model="customer.colors[0].sizes[0].count" name="sizeCount" type="number" label="Size Count" placeholder="Enter size count"
        :validation="string().required()" />
    </div>
  </AppFormDialog>
</template>
