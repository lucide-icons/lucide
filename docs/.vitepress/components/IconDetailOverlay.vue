<script setup lang="ts">
  import type { IconEntity } from '../types'
  import { ref, computed } from 'vue'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
  } from '@headlessui/vue'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';

  const props = defineProps<{
    icon: IconEntity
  }>()

  const emit = defineEmits(['close'])

  const isOpen = computed(() => !!props.icon)

  function onClose() {
    emit('close')
  }

  const size = 24

  const gridLines = computed(() => Array.from({ length:(size - 1) }))

  const iconComponent = computed(() => {
    if (!props.icon) return null
    return createLucideIcon(props.icon.name, props.icon.iconNode)
  })
</script>

<template >
  <div class="overlay-container" v-if="props.icon">
    <div class="overlay-panel">
      <div class="icon-container">
        <component :is="iconComponent" class="icon-component" />
        <svg class="icon-grid" :viewBox="`0 0 ${size} ${size}`" fill="none" stroke-width="0.1" xmlns="http://www.w3.org/2000/svg">
          <g :key="`grid-${i}`" v-for="(_, i) in gridLines">
            <line :key="`horizontal-${i}`" :x1="0" :y1="i + 1" :x2="size" :y2="i + 1" />
            <line :key="`vertical-${i}`" :x1="i + 1" y1="0" :x2="i + 1" :y2="size" />
          </g>
        </svg>
      </div>
      <div class="icon-info">
        <h1 class="icon-name">
          {{ props.icon.name }}
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay-container {
  position: fixed;
  top: 0;
  left: var(--left, 0);
  right: var(--right, 0);
  bottom: 0;
  pointer-events: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  width: auto;
}

@media (min-width: 960px) {
  .overlay-container {
    --left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .overlay-container {
    --left: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
    --right: calc(((100% - (var(--vp-layout-max-width) - var(--vp-sidebar-width))) - 272px) / 2);
  }
  .overlay-panel {
    border-top-right-radius: 8px;
  }
}

.overlay-panel {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--vp-c-bg-elv);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  will-change: transform;
  pointer-events: all;
  height: 240px;
  padding: 24px 32px;
  display: flex;
  box-shadow: var(--vp-shadow-5);
}

.icon-container {
  height: 100%;
  aspect-ratio: 1/1;
  position: relative;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
}

.icon-grid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  stroke: var(--vp-c-divider);
}

.icon-component {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.icon-info {
  padding: 0 24px;
}

.icon-name {
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}



</style>
