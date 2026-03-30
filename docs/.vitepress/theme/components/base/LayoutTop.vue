<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
</script>

<template>
  <div class="top-notification">
    <p>
      <VPLink
        class="notification-link"
        href="/guide/version-1"
        >Lucide v1 is out!</VPLink
      >🚀<br />
      You're looking at the site for v1, for v0 go to
      <VPLink
        class="notification-link"
        href="https://v0.lucide.dev"
        >v0 site</VPLink
      >
    </p>
  </div>
</template>

<style>
:root {
  --vp-layout-top-height: 64px;
}

@media (min-width: 640px) {
  :root {
    --vp-layout-top-height: 32px;
  }
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
  color: var(--vp-c-bg-alt-down);
  font-size: 14px;
  padding: 0 16px;
}

.notification-link {
  font-weight: 500;
  text-decoration: underline;
}

.notification-link::after {
  display: none !important;
}

@media (min-width: 640px) {
  .top-notification br {
    display: none;
  }
}
</style>
