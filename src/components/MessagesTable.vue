<script setup lang="ts">
import MessageEntry from "@/components/MessageEntry.vue";
import type { BAPMessage } from '@/models/generic/BAPMessage'

const props = defineProps<{
  messages: Array<BAPMessage>,
}>()

</script>

<template>

  <div class="flex-auto max-h-full flow-root overflow-auto">
      <table class="w-full text-left">
        <thead class="sticky top-0 bg-white shadow">
          <tr>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">Can ID</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">Channel</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">Sender</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">LSG ID</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">FCT ID</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">OP Code</th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-nowrap">Data</th>
          </tr>
        </thead>
        <tbody>
          <message-entry v-for="message in messages" :key="message.frame.timestamp" :message="message" />
        </tbody>
      </table>
  </div>
</template>

<style scoped>

</style>
