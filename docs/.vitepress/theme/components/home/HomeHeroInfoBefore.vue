<script setup lang="ts">
import Badge from '../base/Badge.vue';
import { moveRight } from '../../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';
import { data } from './HomeHeroInfoBefore.data';
import RocketDuotoneIcon from './RocketDuotoneIcon.ts';
</script>

<template>
  <div class="info">
    <Badge :href="`https://github.com/lucide-icons/lucide/releases/tag/${data.version}`">
      v{{ data.version }}
    </Badge>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;
}

@media (min-width: 960px) {
  .info {
    justify-content: flex-start;
  }
}

.badge {
  display: inline-flex;
  gap: 8px;
  padding: 4px 8px;
}
</style>

<style>
@import '../icons/confetti.css';
</style>
