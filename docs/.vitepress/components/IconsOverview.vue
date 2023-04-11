<script setup lang="ts">
import type { IconEntity } from '../types'
import IconItem from './IconItem.vue'

const props = defineProps<{
  icons: IconEntity[]
}>()

console.log(props.icons);

</script>

<template>
  <div class="icons">
    <div class="icon" v-for="icon in icons" :key="icon.name">
      <IconItem v-bind="icon" />
    </div>
  </div>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  padding: 32px 24px 96px;
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}
</style>
