<script setup lang="ts">
import type { IconEntity } from '../../types'
import IconGrid from './IconGrid.vue'
defineProps<{
  icons: IconEntity[]
}>()
</script>

<template>
  <section class="category">
    <h2 class="title">
      Related Icons
    </h2>
    <IconGrid
      :icons="icons"
    />
  </section>
</template>

<style scoped>
.icon {
  aspect-ratio: 1/1;
}

.title {
  margin-bottom: 24px;
  font-size: 19px;
  font-weight: 500;
}

.category {
  margin-bottom: 32px;
}
</style>
