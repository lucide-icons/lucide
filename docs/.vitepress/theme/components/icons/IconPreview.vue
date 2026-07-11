<script setup lang="ts">
import type { IconEntity } from '../../types';
import { computed, ref } from 'vue';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import { useIconStyleContext } from '../../composables/useIconStyle';
import { squarePen } from '../../../data/iconNodes';

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

const SquarePenIcon = createLucideIcon('SquarePen', squarePen);

const innerSvg = computed(() => {
  if (!props.iconNode) return '';

  const string = props.iconNode
    .map(([tag, attrs]) => {
      const attributes = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${tag} ${attributes}/>`;
    })
    .join('');

  return string
    .replace(/>[\r\n ]+</g, '><')
    .replace(/(<.*?>)|\s+/g, (m, $1) => $1 || ' ')
    .trim();
});

const base64InnerSvg = computed(() => {
  if (typeof window === 'undefined') return '';
  return btoa(innerSvg.value);
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
    <a
      :href="`https://studio.lucide.dev/edit?value=${encodeURIComponent(base64InnerSvg)}&name=${name}`"
      target="_blank"
      rel="noopener noreferrer"
      class="studio-button"
      title="Open in Lucide Studio"
    >
      <SquarePenIcon :size="14" />
    </a>
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
  overflow: hidden;
  flex-shrink: 0;
}
.icon-container > :deep(svg:not(.icon-grid)) {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  color: var(--vp-c-neutral);
  opacity: 0.8;
}

.studio-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s, background-color 0.2s;
  z-index: 2;
}

.icon-container:hover .studio-button,
.studio-button:focus-visible {
  opacity: 1;
}

.studio-button:hover,
.studio-button:focus-visible {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.icon-component.customizable {
  will-change: width, height, stroke-width, stroke;
  /* color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2); */
}
</style>
