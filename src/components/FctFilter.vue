<script setup lang="ts">

import { IconX } from '@tabler/icons-vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import type { GVRETFileMeta } from '@/utils/gvret'
import { toHex } from '@/utils/toHex'

const props = defineProps<{
  fileMeta: GVRETFileMeta;
}>();

const emit = defineEmits(['filtersUpdated']);

const availableFilters = ref(props.fileMeta.fctIds);

watch(() => props.fileMeta.fctIds, () => {
  availableFilters.value = props.fileMeta.fctIds;
}, { deep: true });

const container = ref(null as HTMLDivElement | null);
const input = ref(null as HTMLInputElement | null);

const searchText = ref('');
const showResults = ref(false);
const highlightedResult = ref(-1);
const activeFilters = ref([] as number[]);

const handleInputKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    highlightedResult.value = Math.min(highlightedResult.value + 1, searchResults.value.length - 1);
  } else if (event.key === 'ArrowUp') {
    highlightedResult.value = Math.max(highlightedResult.value - 1, 0);
  } else if (event.key === 'Enter') {
    const selectedChannel = searchResults.value[highlightedResult.value];
    if (selectedChannel) {
      activeFilters.value.push(selectedChannel);
    }
  } else if (event.key === 'Backspace') {
    if (searchText.value === '') {
      activeFilters.value.pop();
    }
  }
};

const handleWindowFocusinEvent = (event: FocusEvent) => {
  if (container.value && container.value.contains(event.target as Node)) {
    showResults.value = true;
  } else {
    showResults.value = false;
    highlightedResult.value = -1;
  }
};

const handleWindowClickEvent = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    showResults.value = false;
    highlightedResult.value = -1;
  }
};

const handleResultClick = (entry: number) => {
  activeFilters.value.push(entry);
  input.value?.focus();
};

const handleResultHover = (index: number) => {
  highlightedResult.value = index;
};

const searchResults = computed(() => {
  return availableFilters.value.filter((entry) => {
    const searchValue = searchText.value.toLowerCase();

    // If the lsg is already in the active filters, don't show it
    if (activeFilters.value.find((filter) => filter === entry)) {
      return false;
    }

    return toHex(entry).toLowerCase().includes(searchValue);
  });
});

watch(searchResults, () => {
  highlightedResult.value = -1;
});

watch(activeFilters, () => {
  emit('filtersUpdated', activeFilters.value);
}, { deep: true });

onMounted(() => {
  document.addEventListener('focusin', handleWindowFocusinEvent);
});

onUnmounted(() => {
  document.removeEventListener('focusin', handleWindowFocusinEvent);
});
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="channel-filter-search" class="text-xl font-semibold">FCT IDs</label>
    <div ref="container" class="relative flex bg-white rounded-md border min-w-96"
         v-on-click-outside="handleWindowClickEvent">
      <div class="flex gap-2 p-1">
            <span v-for="entry in activeFilters" :key="entry" class="flex items-center justify-center bg-green-100 rounded-md">
              <span class="px-2 py-1 text-sm font-medium text-green-700">{{ toHex(entry) }}</span>
              <button @click="activeFilters.splice(activeFilters.indexOf(entry), 1)" class="hover:bg-green-200 h-full rounded-r-md px-2 text-green-800 hover:text-green-900">
                <icon-x class="w-4 h-4 stroke-2" />
              </button>
            </span>
      </div>
      <input ref="input" v-model="searchText" @keydown="handleInputKeydown" id="channel-filter-search" type="text" class="flex-auto border-0 rounded-md ring-0 focus:ring-0 px-1 min-w-52">
      <div v-if="showResults" class="absolute top-full min-w-full bg-white rounded-md border shadow mt-1 z-10">
        <ul class="flex flex-col">
          <li v-for="(entry, index) in searchResults" :key="entry"
              @mouseenter="handleResultHover(index)"
              @click="handleResultClick(entry)"
              class="flex gap-4 p-4 cursor-pointer"
              :class="{'bg-blue-100': (index === highlightedResult), 'even:bg-gray-100': (index !== highlightedResult)}">
            <span>{{ toHex(entry) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
