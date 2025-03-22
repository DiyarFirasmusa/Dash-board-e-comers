<script setup lang="ts">
import TotalCards from './TotalCards.vue'
import SaleryChart from './SaleryChart.vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
    <div class="grid grid-cols-1 gap-16">
      <div v-if="authStore.hasPermission('products.view')">
        <TotalCards/>
      </div>
      <div class="w-full" v-if="authStore.hasPermission('products.view')">>
        <SaleryChart/>
      </div>
    </div>
  </template>