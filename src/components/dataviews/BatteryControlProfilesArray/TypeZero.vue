<script setup lang="ts">
import type { BatteryControlProfile } from '@/models/BatteryControlProfile'
import type { BAPArray } from '@/models/array/generic/BAPArray'

const props = defineProps<{
  profile: BatteryControlProfile,
  array: BAPArray
}>();

</script>

<template>
  <span v-show="array.arrayPositionTransmitted" class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Pos: {{ props.profile.pos }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Name: {{ props.profile.name }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Charge: {{ props.profile.operation.charge }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Climate: {{ props.profile.operation.climate }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Climate on battery: {{ props.profile.operation.climateWithoutExternalSupply }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Auto defrost: {{ props.profile.operation.autoDefrost }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    SH FL: {{ props.profile.operation.seatHeaterFrontLeft }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    SH FR: {{ props.profile.operation.seatHeaterFrontRight }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    SH RL: {{ props.profile.operation.seatHeaterRearLeft }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    SH RR: {{ props.profile.operation.seatHeaterRearRight }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Max current: {{ props.profile.maxCurrent }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Min charge: {{ props.profile.minChargeLevel }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Min range: {{ props.profile.minRange }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Target charge: {{ props.profile.targetChargeLevel }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Target charge dur: {{ props.profile.targetChargeDuration }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Target charge range: {{ props.profile.targetChargeRange }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Unit range: {{ props.profile.unitRange }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Is rangecalc setup: {{ props.profile.rangeCalculationSetup }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Temperature: {{ props.profile.temperature }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    TemperatureUnit: {{ props.profile.temperatureUnit }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Lead time: {{ props.profile.leadTime }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Hold time plug: {{ props.profile.holdingTimePlug }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Hold time battery: {{ props.profile.holdingTimeBattery }}
  </span>
  <span class="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
    Provider ID: {{ props.profile.providerDataId }}
  </span>
</template>

<style scoped>

</style>
