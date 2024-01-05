<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  href?: string;
}>()

const isExternal = computed(() => {
  return props.href?.startsWith('http') ?? false
})

const component = computed(() => {
  return props.href ? 'a' : 'div'
})

const rel = computed(() => {
  return isExternal.value ? 'noreferrer noopener' : undefined
})
</script>

<template>
  <component
    :is="component"
    :href="href"
    :rel="rel"
    class="card"
  >
    <slot />
  </component>
</template>

<style scoped>
.card {
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  padding: 24px;
  text-decoration: none;
}

.card[href] {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color .25s,background-color .25s;
}

.card[href]:hover {
  border-color: var(--vp-c-brand-1);
}

</style>
