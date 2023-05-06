<script setup lang="ts">
import { useRouter } from 'vitepress';
import {PackageItem} from "../../types";
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';

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
    <div class="package-details">
      {{ packageData.description }}
    </div>
    <footer class="package-footer">
      <VPButton
        :href="packageData.documentation"
        text="Guide"
        theme="brand"
        @click="go(packageData.documentation)"
      />
      <VPButton
        :href="packageData.source"
        text="Source"
        theme="alt"
        @click="go(packageData.source)"
      />
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
  height: 100%;
}
.package-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
@media screen and (min-width: 480px) {
  .package-header {
    flex-direction: row;
  }
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
h2.title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 18px;
  font-weight: bold;
}
.package-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.package-details {
  flex-grow: 1;
}
.package-footer {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
