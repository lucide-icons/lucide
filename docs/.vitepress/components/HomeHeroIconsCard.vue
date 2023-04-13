<script setup lang="ts">
import { data } from './HomeHeroIconsCard.data'
import LucideIcon from './LucideIcon.vue'
console.log(data);

</script>

<template>
  <TransitionGroup class="icons-card" name="list" tag="div">
    <LucideIcon
      v-for="icon in data.icons"
      v-bind="icon"
    />
  </TransitionGroup>
</template>

<style scoped>
.icons-card {
  background: var(--vp-input-bg-color);
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  height:100%;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(36px, 1fr));
  box-shadow: var(--vp-shadow-4);
  overflow: hidden;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
