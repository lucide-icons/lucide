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

const { includeLab } = useExternalLibs();

const selectedIconFilter = computed({
  get: () => (includeLab.value ? ICON_FILTERS[0] : ICON_FILTERS[1]),
  set: (filter) => {
    includeLab.value = filter.value === 'all';
  },
});
</script>

<template>
  <Select
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
