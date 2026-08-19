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

const activeSize = ref('1000%');

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
      class="preview-icon"
      :data-size="activeSize"
    />
    <svg
      class="icon-grid"
      :viewBox="`0 0 ${size} ${size}`"
      fill="none"
      stroke-width="0.1"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ show: activeSize === '1000%' }"
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
    <div class="size-buttons" :class="{ show: activeSize !== '1000%' }">
      <button class="size-button" @click="activeSize = '1000%'" :class="{ active: activeSize === '1000%' }">
        1000%
      </button>
      <button class="size-button" @click="activeSize = '200%'" :class="{ active: activeSize === '200%' }">
        200%
      </button>
      <button class="size-button" @click="activeSize = '100%'" :class="{ active: activeSize === '100%' }">
        100%
      </button>
    </div>
    <a
      :href="`https://studio.lucide.dev/edit?value=${encodeURIComponent(base64InnerSvg)}&name=${name}&utm_source=lucide.dev&utm_medium=icon-detail-preview`"
      target="_blank"
      rel="noopener noreferrer"
      class="studio-button"
      title="Open in Lucide Studio"
      aria-label="Open in Lucide Studio"
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
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.icon-grid.show {
  opacity: 1;
}

.icon-container {
  height: 100%;
  aspect-ratio: 1/1;
  position: relative;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
}

.icon-container:hover .size-buttons {
  opacity: 1;
}

.icon-container > :deep(svg.preview-icon) {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  color: var(--vp-c-neutral);
  opacity: 0.8;
  transition: all 0.3s;
  margin: auto;
}

.icon-container > :deep(svg.preview-icon[data-size='1000%']) {
  width: 100%;
  height: 100%;
}

.icon-container > :deep(svg.preview-icon[data-size='200%']) {
  width: 48px;
  height: 48px;
}

.icon-container > :deep(svg.preview-icon[data-size='100%']) {
  width: 24px;
  height: 24px;
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
}

.size-buttons {
  position: absolute;
  bottom: 8px;
  left: 50%;
  padding: 4px;
  border-radius: 12px;
  transform: translateX(-50%);
  display: flex;
  z-index: 99;
  background: var(--vp-code-tab-bg);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.size-buttons.show {
  opacity: 1;
}

.size-button {
  color: var(--vp-code-tab-text-color);
  padding: 2px 8px;
}

.size-button.active {
  background: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  border-radius: 4px;
  color: var(--vp-code-tab-active-text-color);
  text-decoration: none;
}
</style>
