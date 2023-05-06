<script setup lang="ts">
import { data } from './PackageList.data'
import PackageListItem from "./PackageListItem.vue";
</script>

<template>
  <section class="package-group">
    <h1 class="name">Packages</h1>
    <div class="grid package-list" ref="container">
      <PackageListItem v-for="p in data.packages" :packageData="p" />
    </div>
  </section>
  <section class="package-group">
    <h1 class="name">Third-party packages</h1>
    <div class="grid package-list" ref="container">
      <PackageListItem v-for="p in data.thirdPartyPackages" :packageData="p" />
    </div>
  </section>
</template>

<style scoped>
.package-group {
  margin-bottom: 96px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  align-content: space-evenly;
  gap: 24px;
}
.grid > * {
  flex-basis: 256px;
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
