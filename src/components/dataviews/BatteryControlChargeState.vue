<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BatteryControlChargeState, ChargeMode, ChargeState, ChargeStartReason, TargetSOC } from '@/models/BatteryControlChargeState'
import { toHex } from '@/utils/toHex'
import { computed } from 'vue'

const props = defineProps<{
  message: BAPMessage
}>()

const state = BatteryControlChargeState.fromMessage(props.message)

const chargeMode = computed(() => {
  if (state.chargeMode === ChargeMode.Conditioning) {
    return 'Conditioning'
  } else if (state.chargeMode === ChargeMode.AC) {
    return 'AC'
  } else if (state.chargeMode === ChargeMode.DC) {
    return 'DC'
  } else if (state.chargeMode === ChargeMode.ACAndConditioning) {
    return 'AC & Conditioning'
  } else if (state.chargeMode === ChargeMode.DCAndConditioning) {
    return 'DC & Conditioning'
  } else if (state.chargeMode === ChargeMode.Off) {
    return 'Off'
  }

  return state.chargeMode
})

const chargeState = computed(() => {
  if (state.chargeState === ChargeState.Init) {
    return 'Init'
  } else if (state.chargeState === ChargeState.Idle) {
    return 'Idle'
  } else if (state.chargeState === ChargeState.Running) {
    return 'Running'
  } else if (state.chargeState === ChargeState.ConservationCharging) {
    return 'Conservation'
  } else if (state.chargeState === ChargeState.AbortedTemperatureTooLow) {
    return 'TempLow'
  } else if (state.chargeState === ChargeState.AbortedGeneralDeviceError) {
    return 'GeneralError'
  } else if (state.chargeState === ChargeState.AbortedPowerSupplyNotAvailable) {
    return 'NoPower'
  } else if (state.chargeState === ChargeState.AbortedNotInParkPosition) {
    return 'NotInPark'
  } else if (state.chargeState === ChargeState.Completed) {
    return 'Completed'
  } else if (state.chargeState === ChargeState.NoError) {
    return 'No error'
  }

  return state.chargeState
})

const startReason = computed(() => {
  if (state.startReason === ChargeStartReason.Init) {
    return 'Init'
  } else if (state.startReason === ChargeStartReason.Timer1) {
    return 'Timer 1'
  } else if (state.startReason === ChargeStartReason.Timer2) {
    return 'Timer 2'
  } else if (state.startReason === ChargeStartReason.Timer3) {
    return 'Timer 3'
  } else if (state.startReason === ChargeStartReason.Immediately) {
    return 'Immediately'
  } else if (state.startReason === ChargeStartReason.PushButton) {
    return 'PushButton'
  }

  return state.startReason
})

const targetSOC = computed(() => {
  if (state.targetSOC === TargetSOC.Init) {
    return 'Init'
  } else if (state.targetSOC === TargetSOC.MaxSOC) {
    return 'Max SOC'
  } else if (state.targetSOC === TargetSOC.MinSOC) {
    return 'Min SOC'
  }

  return state.targetSOC
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex gap-2">
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Mode: {{ chargeMode }}
      </span>
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        State: {{ chargeState }}
      </span>
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Current charge level: {{ state.currentChargeLevel }}%
      </span>
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Remaining time: {{ state.remainingChargeTime }} min
      </span>
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Start reason: {{ startReason }}
      </span>
      <span class="inline-flex items-center rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
        Target: {{ targetSOC }}
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <span v-for="(data, index) in message.data" :key="index">{{ toHex(data) }}</span>
    </div>
  </div>
</template>

<style scoped></style>
