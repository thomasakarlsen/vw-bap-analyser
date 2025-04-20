<script setup lang="ts">

import type { BAPMessage } from '@/models/generic/BAPMessage'
import { computed, defineAsyncComponent } from 'vue'
import { toHex } from '@/utils/toHex'

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
    <td class="whitespace-nowrap px-3 py-3">{{ message.frame.idHex }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.channel?.name }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.sender }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.deviceIdHex }}</td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.functionIdHex }} <small>{{ message.functionName }}</small></td>
    <td class="whitespace-nowrap px-3 py-3">{{ message.operationIdHex }} <small>{{ message.operationName }}</small></td>
    <td class="flex flex-col gap-2 justify-center whitespace-nowrap px-3 py-3">
      <div class="flex gap-2">
        <span>Type: {{ message.frame.type }}</span>
        <span>Parts: {{ message.frameParts.length }}</span>
      </div>
      <div v-for="(part, index) in message.frameParts" :key="index" class="flex gap-2 bg-gray-50">
        <span v-for="(byte, index) in part.data" :key="index">{{ toHex(byte) }}</span>
      </div>
      <div class="flex gap-2 items-center whitespace-nowrap">
        <span v-if="message.data.length === 0">No data</span>
        <component :is="dataview" :message="message" />
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>
