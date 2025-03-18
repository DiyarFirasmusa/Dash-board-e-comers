<script setup lang="ts">
import TotalCards from './TotalCards.vue'
import SaleryChart from './SaleryChart.vue'

</script>

<template>
    <div class="grid grid-cols-1 gap-16">
      <div>
        <TotalCards/>
      </div>
      <div class="w-full">
        <SaleryChart/>
      </div>
    </div>
  </template>