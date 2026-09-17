<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import Icon from '@lucide/vue/src/Icon';
import RocketDuotoneIcon from '../home/RocketDuotoneIcon.ts';
</script>

<template>
  <div class="top-notification">
    <p>
      <Icon
        :iconNode="RocketDuotoneIcon"
        size="18"
        class="rocket-icon"
      />
      <VPLink
        class="notification-link"
        href="/guide/version-1"
        >Lucide v1 is out!</VPLink
      >
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
@media (min-width: 960px) {
  :root {
    --vp-layout-top-height: 32px;
  }
}
</style>

<style scoped>
.top-notification {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-brand-dark);
  color: var(--vp-c-bg-alt-down);
  font-size: 14px;
  padding: 4px 16px;
  text-wrap: balance;
}

.notification-link {
  font-weight: 500;
  text-decoration: underline;
}

.notification-link::after {
  display: none !important;
}

.rocket-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
