<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { toHex } from '@/utils/toHex'
import { computed } from 'vue'
import { GetArray } from '@/models/array/generic/GetArray'
import { StatusArray } from '@/models/array/generic/StatusArray'

const props = defineProps<{
  message: BAPMessage
}>();

const array = computed(() => {
  // If the operation is get or setget, use the GetArray model
  if (props.message.operationName === 'Get' || props.message.operationName === 'SetGet') {
    return GetArray.fromMessage(props.message)
  } else if (props.message.operationName === 'Status') {
    // If the operation is set, use the SetArray model
    return StatusArray.fromMessage(props.message)
  }

  return null;
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        ASG ID: {{ array?.asgId}}
      </span>
      <span class="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
        Transaction ID: {{ array?.transactionId}}
      </span>
    </div>
    <div class="flex gap-2">
      <span v-if="array instanceof StatusArray" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Total array elements: {{ array?.totalElementsInList}}
      </span>
      <span class="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
        Record type: {{ array?.recordAddress}}
      </span>
      <span class="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
        Start at index: {{ array?.startIndex}}
      </span>
      <span class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
        Elements{{ (array instanceof StatusArray) ? ' in message': ''}}: {{ array?.elements}}
      </span>
    </div>
    <div class="flex gap-2">
      <span v-if="array?.largeIndexes" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
        Large indexes
      </span>
      <span v-if="array?.arrayPositionTransmitted" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
        Includes array positions
      </span>
      <span v-if="array?.arrayDirectionBackward" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
        Is backwards
      </span>
      <span v-if="array?.shiftArrayPosition" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
        Shift position
      </span>
    </div>
    <slot>
      <div class="flex gap-2">
        <span v-for="(byte, index) in array?.data" :key="index">{{ toHex(byte) }}</span>
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>
