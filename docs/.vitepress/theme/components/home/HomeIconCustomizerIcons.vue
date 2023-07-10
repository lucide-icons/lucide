<script setup lang="ts">
import { ref } from 'vue';
import { data } from './HomeHeroIconsCard.data'
import LucideIcon from '../base/LucideIcon.vue'
import { vIntersectionObserver } from '@vueuse/components'

const getInitialItems = () => data.icons.slice(0, 64)
const items = ref(getInitialItems())
const showIcons = ref(false)

// Added intersection observer to improve performance
const onIntersectionObserver: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  if (isIntersecting) {
    showIcons.value = true
  }
}
</script>

<template>
  <div class="icon-grid" v-intersection-observer="onIntersectionObserver">
    <template v-if="showIcons">
      <div
        v-for="icon in items"
        class="icon-grid-item"
        >
        <LucideIcon v-bind="icon" class="lucide-icon"/>
      </div>
    </template>
  </div>
</template>

<style scoped>
.icon-grid {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(68px, 1fr));
  width: 100%;
  height:100%;
  max-height: 360px;
  gap: 1px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  border: 8px solid var(--vp-c-bg);
  position: relative;
  top: 48px;
  right: 0;
  box-shadow: var(--vp-shadow-4);
}

.icon-grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
}

@media (min-width: 640px) {
  .icon-grid {
    top: 0;
    right: -48px;
  }
}

.lucide-icon {
  will-change: width, height, stroke-width, stroke;
  color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2);
  width: calc(var(--customize-size, 24) * 1px);
  height: calc(var(--customize-size, 24) * 1px);
}

.icons-container.absolute-stroke-width .lucide-icon {
  stroke-width: calc(var(--customize-strokeWidth, 2) * 24 / var(--customize-size, 24));
}
</style>
