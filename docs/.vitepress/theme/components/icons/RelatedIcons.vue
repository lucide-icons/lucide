<script setup lang="ts">
import type { IconEntity } from '../../types'
import IconGrid from './IconGrid.vue'
defineProps<{
  icons: IconEntity[]
}>()
</script>

<template>
  <section class="related-icons">
    <h2 class="title">
      Related Icons
    </h2>
    <IconGrid
      :icons="icons"
    />
  </section>
</template>

<style scoped>
.title {
  margin-bottom: 24px;
  font-size: 19px;
  font-weight: 500;
}

.related-icons {
  margin-bottom: 32px;
}
</style>
