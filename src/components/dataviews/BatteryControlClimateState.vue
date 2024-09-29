<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BatteryControlClimateState } from '@/models/BatteryControlClimateState'
import { toHex } from '@/utils/toHex'

const props = defineProps<{
  message: BAPMessage
}>();

const state = BatteryControlClimateState.fromMessage(props.message);
</script>

<template>
  <div class="flex gap-2">
    <span v-if="state.climateMode.climating" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Climating
    </span>
    <span v-if="state.climateMode.autoDefrost" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Auto defrost
    </span>
    <span v-if="state.climateMode.heating" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Heating
    </span>
    <span v-if="state.climateMode.cooling" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Cooling
    </span>
    <span v-if="state.climateMode.ventilation" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Ventilation
    </span>
    <span v-if="state.climateMode.fuelBasedHeating" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      Fuel-based heating
    </span>
    <span class="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
      Current temp.: {{ state.currentTemperature }} {{ state.temperatureUnit ? '°F' : '°C'}}
    </span>
    <span class="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
      Climating time: {{ state.climatingTime }} min
    </span>
    <span class="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
      Climate state: {{ state.climateState }}
    </span>
    <span class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
      Seat heater window state: {{ toHex(state.seatheaterWindowState) }}
    </span>
    <span v-if="state.seatheaterMode.frontLeft" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      SH FL
    </span>
    <span v-if="state.seatheaterMode.frontRight" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      SH FR
    </span>
    <span v-if="state.seatheaterMode.rearLeft" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      SH RL
    </span>
    <span v-if="state.seatheaterMode.rearRight" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      SH RR
    </span>
    <span v-if="state.windowheaterMode.front" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      WH Front
    </span>
    <span v-if="state.windowheaterMode.rear" class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
      WH Rear
    </span>
  </div>
</template>

<style scoped>

</style>
