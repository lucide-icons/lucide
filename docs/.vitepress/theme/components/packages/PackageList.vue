<script setup lang="ts">
import {data} from './PackageList.data'
import PackageListItem from "./PackageListItem.vue";</script>

<template>
  <section class="package-group">
    <h1 class="name">Packages</h1>
    <div class="grid package-list" ref="container">
      <div v-for="p in data.packages" class="item">
        <PackageListItem :packageData="p"/>
      </div>
    </div>
  </section>
  <section class="package-group">
    <h2 class="name">Third-party packages</h2>
    <div class="grid package-list" ref="container">
      <div v-for="p in data.thirdPartyPackages" class="item">
        <PackageListItem :packageData="p"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.name {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
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
