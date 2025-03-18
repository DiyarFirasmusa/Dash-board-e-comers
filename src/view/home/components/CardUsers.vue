<script setup lang='ts'>
import { Icon } from '@iconify/vue/dist/iconify.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  title: string
  total: number
  icon: string
  percentage: number
}
defineProps<Props>()

</script>
<template>
  <Card class="w-full flex flex-col gap-8">
    <CardHeader class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-4">
            <CardDescription>Total User</CardDescription>
            <CardTitle class=" text-3xl">40,345</CardTitle>
        </div>
        <div class="bg-gray-200 p-4 rounded-3xl bg-yellow-200">
            <Icon icon="tabler-user" class="h-6 w-6 text-yellow-700" />
        </div>
    </CardHeader>
    <CardFooter class="flex justify-between px-6 pb-6">
        <p><span class=" text-green-500 text-xl">8.5%</span> Up from yastardy</p>
    </CardFooter>
  </Card>
</template>