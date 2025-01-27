<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BatteryControlClimateOperationModeInstallation } from '@/models/BatteryControlClimateOperationModeInstallation'
import { toHex } from '@/utils/toHex'

const props = defineProps<{
  message: BAPMessage
}>();

const state = BatteryControlClimateOperationModeInstallation.fromMessage(props.message);
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex gap-2">
      <span v-if="state.immediatly" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Immediatly
      </span>
      <span v-if="state.timer1" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Timer 1
      </span>
      <span v-if="state.timer2" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Timer 2
      </span>
      <span v-if="state.timer3" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Timer 3
      </span>
      <span v-if="state.timer4" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Timer 4
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <span v-for="(data, index) in message.data" :key="index">{{ toHex(data) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
