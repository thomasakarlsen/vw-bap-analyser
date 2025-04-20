<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import GenericArray from '@/components/dataviews/GenericArray.vue'
import { BatteryControlProfileStatusArray } from '@/models/array/BatteryControlProfileStatusArray'
import { computed } from 'vue'
import { BatteryControlProfileGetArray } from '@/models/array/BatteryControlProfileGetArray'

const props = defineProps<{
  message: BAPMessage
}>();

const array = computed(() => {
  if (props.message.operationName === 'Status') {
    return BatteryControlProfileStatusArray.fromMessage(props.message)
  }

  return BatteryControlProfileGetArray.fromMessage(props.message)
})

</script>

<template>
  <GenericArray :message="message">
    <div v-for="(profile, index) in array.items" :key="profile.pos ?? index" class="flex gap-2">
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Pos: {{ profile.pos }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Name: {{ profile.name }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Charge: {{ profile.operation.charge }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Climate: {{ profile.operation.climate }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Climate on battery: {{ profile.operation.climateWithoutExternalSupply }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Auto defrost: {{ profile.operation.autoDefrost }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        SH FL: {{ profile.operation.seatHeaterFrontLeft }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        SH FR: {{ profile.operation.seatHeaterFrontRight }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        SH RL: {{ profile.operation.seatHeaterRearLeft }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        SH RR: {{ profile.operation.seatHeaterRearRight }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Max current: {{ profile.maxCurrent }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Min charge: {{ profile.minChargeLevel }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Min range: {{ profile.minRange }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Target charge: {{ profile.targetChargeLevel }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Target charge dur: {{ profile.targetChargeDuration }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Target charge range: {{ profile.targetChargeRange }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Unit range: {{ profile.unitRange }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Is rangecalc setup: {{ profile.rangeCalculationSetup }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Temperature: {{ profile.temperature }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        TemperatureUnit: {{ profile.temperatureUnit }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Lead time: {{ profile.leadTime }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Hold time plug: {{ profile.holdingTimePlug }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Hold time battery: {{ profile.holdingTimeBattery }}
      </span>
      <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Provider ID: {{ profile.providerDataId }}
      </span>
    </div>
  </GenericArray>
</template>

<style scoped>

</style>
