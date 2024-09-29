<script setup lang="ts">
import type { BAPMessage } from '@/models/generic/BAPMessage'
import { toHex } from '@/utils/toHex'

const props = defineProps<{
  message: BAPMessage
}>();

</script>

<template>
  <div v-for="(data, index) in message.data" :key="index" class="flex flex-col items-center">
    <span>{{ toHex(data) }}</span>
  </div>
</template>

<style scoped>

</style>
