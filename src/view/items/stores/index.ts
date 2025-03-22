import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";



export const useStore = defineStore('customers-page', () => {
  const isCreateDialogOpen = ref(false);
  const isEditDialogOpen = ref(false);
  const selectedId = ref();
  const dataCatgoray = ref(null);

  const openCreateDialog = () => {
    isCreateDialogOpen.value = true;
  }

  const openEditDialog = (id: string) => {
    selectedId.value = id;
    isEditDialogOpen.value = true;
  }

  return {
    isCreateDialogOpen,
    isEditDialogOpen,
    openEditDialog,
    openCreateDialog,
    selectedId
  }
})
