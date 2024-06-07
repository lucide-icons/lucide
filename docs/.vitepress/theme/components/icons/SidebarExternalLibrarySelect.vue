<script setup lang="ts">
import Checkbox from '../base/Checkbox.vue'
import SidebarTitle from './SidebarTitle.vue'
import { useExternalLibs } from '../../composables/useExternalLibs';
import { ExternalLibs } from '../../types';

interface ExternalLibrary {
  name: string;
  value: ExternalLibs;
}

const externalLibraries: ExternalLibrary[] = [
  {
    name: 'Lab',
    value: 'lab'
  },
];

const { selectedLibs } = useExternalLibs();
</script>

<template>
  <div class="external-library-select">
    <SidebarTitle>
      Include external libs
    </SidebarTitle>
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
