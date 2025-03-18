<script setup lang="ts">
import Card from './Card.vue';
</script>
<template>
    <div class="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <div class="w-full">
        <Card />
      </div>
      <div class="w-full">
        <Card />
      </div>
      <div class="w-full">
        <Card />
      </div>
      <div class="w-full">
        <Card />
      </div>
    </div>
  </template>