<script setup lang="ts">
import Badge from '../base/Badge.vue';
import HomeContainer from './HomeContainer.vue';
import { data } from './HomeHeroInfoBefore.data'

</script>
<template>
  <Badge :href="`https://github.com/lucide-icons/lucide/releases/tag/${data.version}`">v{{ data.version }}</Badge>
</template>

<style scoped>
.container {
  margin-block: 0;
  margin-top: 37px;
  margin-bottom: -96px;
  display: flex;
  justify-content: center;
}

.badge {
  display: inline-block;
}

@media (min-width: 640px) {
  .container {
    margin-bottom: -131px;
  }
}

@media (min-width: 960px) {
  .container {
    justify-content: flex-start;
  }

  .badge {
    display: inline-block;
  }
}
</style>
