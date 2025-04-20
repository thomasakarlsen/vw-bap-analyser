<script setup lang="ts">

import type { BAPMessage } from '@/models/generic/BAPMessage'
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  message: BAPMessage
}>()

const dataview = computed(() => {

  let viewName: string = props.message.dataview;

  return defineAsyncComponent(() => import(`@/components/dataviews/${viewName}.vue`));
});

</script>

<template>
  <tr :class="{ 'bg-blue-100 even:bg-blue-200': message.sender === 'asg', 'bg-green-100 even:bg-green-200': message.sender === 'fsg' }">
    <td class="whitespace-nowrap px-3 py-3">{{ message.frame.idHex }} - {{ message.frame.type }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.channel?.name }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.sender }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.deviceIdHex }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.functionIdHex }} <small>{{ message.functionName }}</small></td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.operationIdHex }} <small>{{ message.operationName }}</small></td>
    <td class="flex gap-2 items-center whitespace-nowrap px-3 py-3">
      <span v-if="message.data.length === 0">No data</span>
      <component :is="dataview" :message="message" />
    </td>
  </tr>
</template>

<style scoped>

</style>
