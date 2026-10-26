<script setup lang="ts">
import { useRouter } from 'vitepress';
import {PackageItem} from "../../types";
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Card from '../base/Card.vue'

const { go } = useRouter()
const props = defineProps<{
  packageData: PackageItem,
}>()
</script>

<template>
  <div>
    <Card class="package">
      <header class="package-header">
        <div class="package-icon-well">
          <img :src="packageData.icon" alt="" class="package-icon" :class="{[packageData.iconClass]: true, light: packageData.iconDark}" />
          <img v-if="packageData.iconDark" :src="packageData.iconDark" alt="" class="package-icon dark" :class="packageData.iconClass" />
        </div>
        <div class="package-title">
          <h2 class="title">{{ props.packageData?.name }}</h2>
          <a v-for="shield in props.packageData.shields" :href="shield.href" class="package-shield" rel="noreferrer noopener">
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
        />
        <VPButton
          :href="packageData.source"
          text="Source"
          theme="alt"
        />
      </footer>
    </Card>
  </div>
</template>

<style scoped>
.package {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  transition: transform 0.3s ease, border-color 0.3s, box-shadow 0.3s;
  transition-duration: 0.3s !important;
}

/* The card lifts with a brand border on hover, its logo tilts in, and the buttons follow */
.package:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--vp-c-brand) 45%, transparent);
  box-shadow: var(--vp-shadow-3);
}

.package-icon-well .package-icon {
  display: block;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-duration: 0.4s !important;
}

.package:hover .package-icon {
  transform: scale(1.08) rotate(-4deg);
}

.package-footer :deep(.VPButton) {
  transition: color 0.25s, border-color 0.25s, background-color 0.25s, transform 0.25s, box-shadow 0.25s;
  transition-duration: 0.25s !important;
}

.package-footer :deep(.VPButton:hover) {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-2);
}

/* The Guide button gets Lucide's arrow-right icon, which moves on when hovered */
.package-footer :deep(.VPButton.brand) {
  display: inline-flex;
  align-items: center;
}

.package-footer :deep(.VPButton.brand)::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  background-color: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E") center / contain no-repeat;
  transition: transform 0.25s ease;
  transition-duration: 0.25s !important;
}

.package-footer :deep(.VPButton.brand:hover)::after {
  transform: translateX(3px);
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
html.dark .package-icon-invert {
  filter: invert(1) hue-rotate(180deg);
}
html.dark .package-icon.light {
  display: none;
}
html:not(.dark) .package-icon.dark {
  display: none;
}
</style>
