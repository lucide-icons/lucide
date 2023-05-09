<script setup lang="ts">
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';
import { useMediaQuery } from '@vueuse/core';
import { useRouter } from 'vitepress';

export type IconNode = [elementName: string, attrs: Record<string, string>][]

const props = defineProps<{
  name: string;
  tags: string[];
  categories: string[];
  // TODO: Add contributors
  // contributors: Contributor[];
  iconNode: IconNode;
  active: boolean;
  customizable?: boolean;
}>()

const emit = defineEmits(['setActiveIcon'])

const { go } = useRouter()
const showOverlay = useMediaQuery('(min-width: 860px)');

const icon = createLucideIcon(props.name, props.iconNode)

function navigateToIcon() {
  if(showOverlay.value) {
    window.history.pushState({}, '', `/icons/${props.name}`)
    emit('setActiveIcon', props.name)
  }
  else {
    go(`/icons/${props.name}`)
  }
}
</script>

<template>
  <button
    class="icon-button"
    @click="navigateToIcon"
    :class="{ 'active' : active }"
    :data-title="name"
    :aria-label="name"
  >
    <KeepAlive>
      <component :is="icon" class="lucide-icon" :class="{ customizable }" />
    </KeepAlive>
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  display: inline-flex;
  width: 56px;
  height: 56px;
  font-size: 24px;
}

.icon-button:hover:before {
  opacity: 1;
  transform: translate(-50%, 48px) scale(1);
}

.icon-button:before {
  content: attr(data-title);
  display: block;
  font-size: 12px;
  line-height: 20px;
  margin-left: 27px;
  transform: translate(-50%, 48px) scale(0.9);
  font-weight: 400;
  position: absolute;
  background: var(--vp-c-brand-dark);
  color: white;
  z-index: 10;
  white-space: nowrap;
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: var(--vp-shadow-1);
  opacity: 0;
  pointer-events: none;
  transition: cubic-bezier(0.19, 1, 0.22, 1) .2s;
  transition-property: opacity, transform;
  /* max-width: calc((32px * 2) + 56px); */
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
}

.icon-button:active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.icon-button.medium {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.icon-button.big {
  border-radius: 24px;
  padding: 0 24px;
  line-height: 46px;
  font-size: 16px;
}

.icon-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.icon-button:active {
    border-color: var(--vp-button-alt-active-border);
    color: var(--vp-button-alt-active-text);
    background-color: var(--vp-button-alt-active-bg);
}

.icon-button.active {
  border-color: var(--vp-c-brand);
}

.lucide-icon {
  margin: auto;
}
.lucide-icon.customizable {
  will-change: width, height, stroke-width, stroke;
  color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2);
  width: calc(var(--customize-size, 24) * 1px);
  height: calc(var(--customize-size, 24) * 1px);
}
</style>
