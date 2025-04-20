<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import GenericArray from '@/components/dataviews/GenericArray.vue'
import { BatteryControlProfileStatusArray } from '@/models/array/BatteryControlProfileStatusArray'
import { computed } from 'vue'
import { BatteryControlProfileGetArray } from '@/models/array/BatteryControlProfileGetArray'
import TypeSix from '@/components/dataviews/BatteryControlProfilesArray/TypeSix.vue'
import TypeZero from '@/components/dataviews/BatteryControlProfilesArray/TypeZero.vue'
import { toHex } from '@/utils/toHex'

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
      <template v-if="array.recordAddress === 6">
        <TypeSix :profile="profile" :array="array" />
      </template>
      <template v-else>
        <TypeZero :profile="profile" :array="array" />
      </template>
      <div class="flex gap-2">
        <span v-for="(byte, index) in profile.data" :key="index">{{ toHex(byte) }}</span>
      </div>
    </div>
  </GenericArray>
</template>

<style scoped>

</style>
