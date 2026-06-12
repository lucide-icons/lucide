<script setup lang="ts">
import { data } from './PackageList.data'
import GridSection from '../base/GridSection.vue'
import PackageListItem from "./PackageListItem.vue";
</script>

<template>
  <GridSection
    title="Packages"
    :headingLevel="1"
    class="package-group"
  >
    <PackageListItem
      v-for="packageData in data.packages"
      :packageData="packageData"
    />
  </GridSection>

  <GridSection
    title="Third-party packages"
    :headingLevel="2"
    class="package-group"
  >
    <PackageListItem
      v-for="packageData in data.thirdPartyPackages"
      :packageData="packageData"
    />
  </GridSection>
</template>

<style scoped>
.name {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
}

.package-group {
  margin-bottom: 96px;
}
</style>
