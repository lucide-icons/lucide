<script setup lang="ts">
import { useRouter } from 'vitepress';
import {PackageItem} from "../../types";

const { go } = useRouter()
const props = defineProps<{
  packageData: PackageItem,
}>()
</script>

<template>
  <article class="package">
    <header class="package-header">
      <div class="package-icon-well">
        <img :src="packageData.icon" alt="" class="package-icon" />
      </div>
      <div class="package-title">
        <h2 class="title">{{ props.packageData.name }}</h2>
        <a v-for="shield in props.packageData.shields" :href="shield.href" class="package-shield">
          <img :src="shield.src" :alt="shield.href" />
        </a>
      </div>
    </header>
    <div class="details">
      {{ packageData.description }}
    </div>
    <footer class="package-footer">
      <button></button>
    </footer>
  </article>
</template>

<style scoped>
.package {
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.package {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.package-icon-well {
  padding: 16px;
  border-radius: 12px;
  background-color: var(--vp-c-bg);
}
.package-icon {
  width: 64px;
  height: 64px;
}
.package-header {
  display: flex;
  flex-direction: row;
  gap: 24px;
}
h2.title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 20px;
  font-weight: bold;
}
.package-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
