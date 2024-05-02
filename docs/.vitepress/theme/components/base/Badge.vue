<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vitepress';

const { go } = useRouter()
const props = defineProps<{
  href?: string
}>()

const isExternal = computed(() => props.href?.startsWith('http') ?? false)

const component = computed(() => props.href ? 'a' : 'div')
const target = computed(() => isExternal.value ? '_blank' : undefined)
const rel = computed(() => isExternal.value ? 'noreferrer noopener' : undefined)

const onClick = computed(() => {
  if(!props.href || isExternal) return
  return go(props.href)
})
</script>

<template>
  <component
    :is="component"
    :href="href"
    class="badge"
    :target="target"
    :rel="rel"
    @click="onClick"
  >
    <slot/>
  </component>
</template>

<style>
.badge, a.badge, .vp-doc a.badge {
  display: block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  padding: 2px 12px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  text-decoration: none;
  /* width: 56px;
  height: 56px; */
  font-size: 16px;
}

.badge[href]:hover, a.badge:hover  {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
  text-decoration: none;
}

.badge[href]:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}

.badge.active {
  border-color: var(--vp-c-brand);
  /* color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg); */
}


</style>
