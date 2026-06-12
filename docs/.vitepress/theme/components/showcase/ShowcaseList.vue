<script setup lang="ts">
import companies from '../../../data/companiesData.json'
import componentLibraries from '../../../data/componentLibrariesData.json'
import GridSection from '../base/GridSection.vue'
import ShowcaseListItem from "./ShowcaseListItem.vue";
</script>

<template>
  <GridSection
    title="Used by"
    :headingLevel="1"
    class="package-group"
  >
    <ShowcaseListItem
      v-for="company in companies"
      :showcaseItem="company"
    />
  </GridSection>

  <GridSection
    title="Used in"
    :headingLevel="1"
    class="package-group"
  >
    <ShowcaseListItem
      v-for="componentLibrary in componentLibraries"
      :showcaseItem="componentLibrary"
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
