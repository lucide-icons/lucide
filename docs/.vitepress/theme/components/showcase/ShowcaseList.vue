<script setup lang="ts">
import companiesData from '../../../data/companiesData.json'
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
      v-for="packageData in companiesData"
      :showcaseItem="packageData"
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

.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  align-content: space-evenly;
  box-sizing: border-box;
  margin: -8px;
}

.grid > * {
  flex-basis: 100%;
  box-sizing: border-box;
  padding: 8px;
}

@media (min-width: 960px) {
  .grid > * {
    flex-basis: 50%;
  }
}

@media (min-width: 1280px) {
  .grid > * {
    flex-basis: 33.33%;
  }
}

</style>
