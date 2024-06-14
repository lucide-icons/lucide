<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6,
}>()

const headingElement = computed(() => `h${props.headingLevel ?? 2}`)
</script>

<template>
  <component :is="headingElement" class="section-title">
    <slot />
  </component>
</template>

<style scoped>
.section-title {
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
}
</style>
