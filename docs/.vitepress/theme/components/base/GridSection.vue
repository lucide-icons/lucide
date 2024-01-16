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
  margin-bottom: 32px;
}

section {
  margin-bottom: 96px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  align-content: space-evenly;
  box-sizing: border-box;
  margin: -8px;
}

.grid > * {
  flex-basis: 100%;
  box-sizing: border-box;
  padding: 8px;
}

@media (min-width: 960px) {
  .grid > * {
    flex-basis: 50%;
  }
}

@media (min-width: 1280px) {
  .grid > * {
    flex-basis: 33.33%;
  }
}


</style>
