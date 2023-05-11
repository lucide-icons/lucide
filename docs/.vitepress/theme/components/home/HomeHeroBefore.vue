<script setup lang="ts">
import Badge from '../base/Badge.vue';
import lucidePackage from '../../../../../packages/lucide/package.json';
import HomeContainer from './HomeContainer.vue';
const currentVersion = lucidePackage.version;

</script>
<template>
  <HomeContainer class="container">
    <Badge>v{{ currentVersion }}</Badge>
  </HomeContainer>
</template>

<style scoped>
.container {
  margin-block: 0;;
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
