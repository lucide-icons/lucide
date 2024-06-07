<script setup lang="ts">
import { ref } from 'vue';
import Checkbox from '../base/Checkbox.vue'
import SidebarTitle from './SidebarTitle.vue'
const externalLibraries = [
  {
    name: 'Lab',
    value: 'lab'
  },
];

const selectedLibraries = ref<string[]>([]);
</script>

<template>
  <div class="external-library-select">
    <SidebarTitle>
      Include external libs
    </SidebarTitle>
    {{ selectedLibraries }}
    <ul>
      <li
        v-for="library in externalLibraries"
        :key="library.name"
      >
        <Checkbox
          :label="library.name"
          :id="library.name"
          v-model="selectedLibraries"
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
