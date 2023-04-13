<script setup lang="ts">
// import type { IconEntity } from '../types';
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';
import { useRouter } from 'vitepress';

export type IconNode = [elementName: string, attrs: Record<string, string>][]

const props = defineProps<{
  name: string;
  tags: string[];
  categories: string[];
  // contributors: Contributor[];
  iconNode: IconNode;
}>()

const emit = defineEmits(['setActiveIcon'])

const { go } = useRouter()

const icon = createLucideIcon(props.name, props.iconNode)

function navigateToIcon() {
  window.history.pushState({}, '', `/icons/${props.name}`)
  emit('setActiveIcon', props.name)
}
</script>

<template>
  <button class="icon-button" @click="navigateToIcon">
    <component :is="icon" />
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  padding: 15px;
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

/* .icon-button {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
} */

.icon-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.icon-button.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.icon-button.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}

.icon-button.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
}
</style>
