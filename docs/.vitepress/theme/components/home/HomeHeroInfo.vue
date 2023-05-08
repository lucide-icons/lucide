<script setup lang="ts">
import Badge from '../base/Badge.vue';
import lucidePackage from '../../../../../packages/lucide/package.json';
const currentVersion = lucidePackage.version;
</script>
<template>
  <div class="hero-badge">
    <Badge>v{{ currentVersion }}</Badge>
  </div>
  <h1>
    <span class="name">Beautiful &</span><br>
    <span class="text">consistent icons</span>
  </h1>
  <p class="tagline">Made by the community.</p>
</template>

<style scoped>
h1 {
  line-height: 64px;
  font-size: 56px;
  max-width: 576px;
  font-weight: 700;
  white-space: pre-wrap;
}
.name {
  color: var(--vp-c-brand);
}
.badge {
  display: inline-block;
  margin-bottom: 16px;
}
</style>
