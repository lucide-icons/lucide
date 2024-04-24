<script setup lang="ts">
import { computed } from 'vue';
import CardGrid from './CardGrid.vue';

const props = defineProps<{
  title: string,
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6,
}>()

const headingElement = computed(() => `h${props.headingLevel}`)
</script>

<template>
  <section>
    <component :is="headingElement" class="name">{{ title }}</component>
    <CardGrid>
      <slot />
    </CardGrid>
  </section>
</template>

<style scoped>
.name {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 36px;
}

section {
  margin-bottom: 96px;
}
</style>
