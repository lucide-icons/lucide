<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@lucide/vue/src/Icon';
import { listFilter } from '../../../data/iconNodes';
import { useExternalLibs } from '../../composables/useExternalLibs';
import Select from '../base/Select.vue';

const ICON_FILTERS = [
  {
    name: 'All icons',
    value: 'all',
  },
  {
    name: 'Lucide only',
    value: 'lucide',
  },
];

const { selectedLibs } = useExternalLibs();

const selectedIconFilter = computed({
  get: () => (selectedLibs.value.includes('lab') ? ICON_FILTERS[0] : ICON_FILTERS[1]),
  set: (filter) => {
    selectedLibs.value = filter.value === 'all' ? ['lab'] : [];
  },
});
</script>

<template>
  <Select
    id="icon-filter-select"
    buttonLabel="Filter icons"
    :items="ICON_FILTERS"
    v-model="selectedIconFilter"
  >
    <template #start-icon>
      <Icon
        :iconNode="listFilter"
        class="chevron-icon"
        aria-hidden="true"
      />
    </template>
  </Select>
</template>
