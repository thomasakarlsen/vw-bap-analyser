<script setup lang="ts">
import { computed, ref } from 'vue'
import MessagesTable from '@/components/MessagesTable.vue'
import {BAPMessage} from "@/models/generic/BAPMessage";
import { type GVRETFileMeta, parseGVRETFile } from '@/utils/gvret'
import type { ChannelSearchIndexEntry } from '@/types/search'
import CanIdFilter from '@/components/CanIdFilter.vue'
import LsgFilter from '@/components/LsgFilter.vue'
import FctFilter from '@/components/FctFilter.vue'


const file = ref(null as File | null);
const messages = ref([] as BAPMessage[]);

const fileMeta = ref({ lsgIds: [], canIds: [], fctIds: []} as GVRETFileMeta);

const activeFilters = ref([] as ChannelSearchIndexEntry[]);
const activeLsgFilters = ref([] as number[]);
const activeFctFilters = ref([] as number[]);

const filteredMessages = computed(() => {
  // Filter by can ID
  let filtered = messages.value.filter((message) => {
    // If no active filters, return all messages
    if (activeFilters.value.length === 0) {
      return true;
    }

    return activeFilters.value.find((filter) => filter.id === message.frame.id);
  });

  // Filter by LSG ID
  filtered = filtered.filter((message) => {
    // If no active filters, return all messages
    if (activeLsgFilters.value.length === 0) {
      return true;
    }

    return message.deviceId && activeLsgFilters.value.includes(message.deviceId);
  });

  // Filter by FCT ID
  filtered = filtered.filter((message) => {
    // If no active filters, return all messages
    if (activeFctFilters.value.length === 0) {
      return true;
    }

    return message.functionId && activeFctFilters.value.includes(message.functionId);
  });

  return filtered
});

const handleFileChanged = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target && target.files) {
    file.value = target.files[0];
    parseGVRETFile(file.value, (parsedMessages, fileMetaRet: GVRETFileMeta) => {
      messages.value = parsedMessages;
      fileMeta.value = fileMetaRet;
    });
  }
};

const handleFiltersUpdated = (filters: ChannelSearchIndexEntry[]) => {
  activeFilters.value = filters;
};

const handleLsgFiltersUpdated = (filters: number[]) => {
  activeLsgFilters.value = filters;
};

const handleFctFiltersUpdated = (filters: number[]) => {
  activeFctFilters.value = filters;
};
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <header class="shadow shadow-">
      <div class="flex p-4 gap-4 bg-neutral-100 border-b">
        <div>
          <h1 class="text-2xl font-semibold">VW BAP Analyser</h1>
        </div>
        <div class="flex gap-4">
          <div class="min-w-96">
            <label for="file" class="sr-only">file</label>
            <input @change="handleFileChanged" type="file" name="file" id="file" class="block w-full rounded-md border-0 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
          file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-600 file:text-white
          hover:file:bg-gray-700">
          </div>
        </div>
      </div>
      <div class="flex p-4 gap-4 bg-neutral-50">
        <can-id-filter @filtersUpdated="handleFiltersUpdated" :fileMeta="fileMeta" />
        <lsg-filter @filtersUpdated="handleLsgFiltersUpdated" :fileMeta="fileMeta" />
        <fct-filter @filtersUpdated="handleFctFiltersUpdated" :fileMeta="fileMeta" />
      </div>
    </header>

    <main class="flex flex-auto flex-col overflow-hidden">
      <messages-table :messages="filteredMessages" />
    </main>
  </div>
</template>

<style scoped>
</style>
