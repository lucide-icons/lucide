<script setup lang="ts">
import Checkbox from '../base/Checkbox.vue';
import SidebarTitle from './SidebarTitle.vue';
import { useExternalLibs } from '../../composables/useExternalLibs';
import { ExternalLibs } from '../../types';
import { watch } from 'vue';
import { track } from '../../utils/openpanel';

interface ExternalLibrary {
  name: string;
  value: ExternalLibs;
}

const externalLibraries: ExternalLibrary[] = [
  {
    name: 'Lab',
    value: 'lab',
  },
];

const { selectedLibs } = useExternalLibs();

watch(selectedLibs, (libs, previousLibs) => {
  for (const { value } of externalLibraries) {
    const enabled = libs.includes(value);
    if (enabled !== previousLibs.includes(value)) {
      track('icons_external_lib_toggle', { library: value, enabled });
    }
  }
});
</script>

<template>
  <div class="external-library-select">
    <SidebarTitle> Include external libs </SidebarTitle>
    <ul>
      <li
        v-for="library in externalLibraries"
        :key="library.name"
      >
        <Checkbox
          :label="library.name"
          :id="library.name"
          v-model="selectedLibs"
          :value="library.value"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.external-library-select {
  margin-bottom: 24px;
}
</style>
