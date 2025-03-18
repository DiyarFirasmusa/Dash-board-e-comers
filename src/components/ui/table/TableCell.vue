<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  colspan?: number
}>()
</script>

<template>
  <td :colspan :class="cn(
    'p-4 align-middle [&:has([role=checkbox])]:pr-0',
    props.class,
  )
    ">
    <slot />
  </td>
</template>
