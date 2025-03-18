<script setup lang="ts">
import CardUsers from './CardUsers.vue';
import CardOrder from './CardOrder.vue';
import CardSalers from './CardSalers.vue';
import CardPending  from './CardPending.vue'

</script>
<template>
    <div class="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <div class="w-full">
        <CardUsers />
      </div>
      <div class="w-full">
        <CardOrder />
      </div>
      <div class="w-full">
        <CardSalers />
      </div>
      <div class="w-full">
        <CardPending />
      </div>
    </div>
  </template>