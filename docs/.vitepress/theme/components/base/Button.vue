<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  href?: string;
}>()

const isExternal = computed(() => {
  return props.href?.startsWith('http') ?? false
})

const component = computed(() => {
  return props.href ? 'a' : 'button'
})

const target = computed(() => {
  return isExternal.value ? '_blank' : undefined
})

const rel = computed(() => {
  return isExternal.value ? 'noreferrer noopener' : undefined
})
</script>

<template>
  <component
    :is="component"
    v-bind="$attrs"
    :href="href"
    :target="target"
    :rel="rel"
    class="icon-button"
  >
    <slot />
  </component>
</template>

<style scoped>
.icon-button {
  display: inline-flex;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  padding: 6px;
  border-radius: 8px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: inherit;
  text-decoration: none;
  /* width: 56px;
  height: 56px; */
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.icon-button span {
  padding: 0 4px;
  display: block;
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
  /* color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg); */
}
</style>
