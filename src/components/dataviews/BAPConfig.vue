<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { toHex } from '@/utils/toHex'
import { BAPConfig } from '@/models/BAPConfig'
import { StatusArray } from '@/models/array/generic/StatusArray'

const props = defineProps<{
  message: BAPMessage
}>();

const config = props.message.data.length > 0 ? BAPConfig.fromMessage(props.message) : null;

</script>

<template>
  <div v-if="config" class="flex gap-2">
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Major version: {{ config?.majorVersion }}
      </span>
    <span class="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
        Minor version: {{ config?.minorVersion }}
      </span>
    <span class="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
        LSG Class: {{ config?.lsgClass }}
      </span>
    <span class="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
        LSG Major version: {{ config?.lsgMajorVersion }}
    </span>
    <span class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
        LSG Minor version: {{ config?.lsgMinorVersion }}
    </span>
  </div>
</template>

<style scoped>

</style>
