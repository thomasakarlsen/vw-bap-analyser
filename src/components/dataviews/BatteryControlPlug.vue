<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { toHex } from '@/utils/toHex'
import { BatteryControlPlug, LockSetup, LockState, SupplyState, PlugState} from '@/models/BatteryControlPlug';

const props = defineProps<{
  message: BAPMessage
}>();

const state = BatteryControlPlug.fromMessage(props.message);
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex gap-2">
    <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Lock setup: {{ LockSetup[state.lockSetup] }}
    </span>
    <span class="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
      Lock state: {{ LockState[state.lockState] }}
    </span>
    <span class="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
      Supply: {{ SupplyState[state.supplyState] }}
    </span>
    <span class="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
      Plug: {{ PlugState[state.plugState] }}
    </span>
  </div>
    <div class="flex items-center space-x-2">
      <span v-for="(data, index) in message.data" :key="index">{{ toHex(data) }}</span>
    </div>
  </div>
  
</template>

<style scoped>

</style>
