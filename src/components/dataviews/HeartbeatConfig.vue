<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { HeartbeatConfig } from '@/models/HeartbeatConfig'

const props = defineProps<{
  message: BAPMessage
}>();

const config = HeartbeatConfig.fromMessage(props.message);

</script>

<template>
  <div class="flex gap-2">
    <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Time between heartbeats: {{ config.timeBetween }}
    </span>
  </div>
</template>

<style scoped>

</style>
