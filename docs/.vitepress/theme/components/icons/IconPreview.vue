<script setup lang="ts">
import type { IconEntity } from '../../types';
import { computed, ref } from 'vue';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import { useIconStyleContext } from '../../composables/useIconStyle';

const props = defineProps<{
  name: IconEntity['name'];
  iconNode: IconEntity['iconNode'];
  customizable?: boolean;
}>();

const { size, color, strokeWidth, absoluteStrokeWidth } = useIconStyleContext();
const previewIcon = ref();

const gridLines = computed(() => Array.from({ length: size.value - 1 }));

const iconComponent = computed(() => {
  if (!props.name || !props.iconNode) return null;
  return createLucideIcon(props.name, props.iconNode);
});
</script>

<template>
  <div class="icon-container">
    <component
      ref="previewIcon"
      :is="iconComponent"
      :size="size"
      :color="color"
      :strokeWidth="absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth"
    />
    <svg
      class="icon-grid"
      :viewBox="`0 0 ${size} ${size}`"
      fill="none"
      stroke-width="0.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        :key="`grid-${i}`"
        v-for="(_, i) in gridLines"
      >
        <line
          :key="`horizontal-${i}`"
          :x1="0"
          :y1="i + 1"
          :x2="size"
          :y2="i + 1"
        />
        <line
          :key="`vertical-${i}`"
          :x1="i + 1"
          y1="0"
          :x2="i + 1"
          :y2="size"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.icon-grid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  stroke: var(--vp-c-divider);
}
.icon-container {
  height: 100%;
  aspect-ratio: 1/1;
  position: relative;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
}
.icon-container > :deep(svg:not(.icon-grid)) {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  color: var(--vp-c-neutral);
  opacity: 0.8;
}

.icon-component.customizable {
  will-change: width, height, stroke-width, stroke;
  /* color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2); */
}
</style>
