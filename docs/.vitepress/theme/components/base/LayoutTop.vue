<!-- <script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { watchEffect } from 'vue';
</script> -->
<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
</script>

<template>
  <div class="top-notification">
    <p>
      Release candidate for
      <VPLink
        class="notification-link"
        href="/guide/version-1"
        >Lucide v1 is now available!</VPLink
      >
      You looking at the site for v1, for v0 go to
      <VPLink
        class="notification-link"
        href="https://v0.lucide.dev"
        >v0.lucide.dev</VPLink
      >
    </p>
  </div>
</template>

<style>
:root {
  --vp-layout-top-height: 32px;
}
</style>

<style scoped>
.top-notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  height: var(--vp-layout-top-height);
  justify-content: center;
  align-items: center;
  background: var(--vp-c-brand-dark);
  font-size: 14px;
}

.notification-link {
  /* color: var(--vp-c-brand-light); */
  font-weight: 500;
  text-decoration: underline;
}
</style>
