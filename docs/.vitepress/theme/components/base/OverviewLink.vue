<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';

defineProps<{
  href?: string;
  title?: string;
  desc?: string;
}>();
</script>

<template>
  <VPLink
    class="overview-link"
    :href="href"
  >
    <span class="title">
      {{ title }}
    </span>
    <span
      v-if="desc"
      class="desc"
    >
      {{ desc }}
    </span>
  </VPLink>
</template>

<style scoped>
.overview-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s, background-color 0.25s, transform 0.25s ease, box-shadow 0.25s;
  transition-duration: 0.25s !important;
  text-decoration: none;
}

/* On hover the card lifts with a light brand tint, like the previous / next page links,
   and Lucide's arrow-right icon slides in after the title */
.overview-link:hover,
.overview-link:focus-visible {
  outline: none;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  background-color: color-mix(in srgb, var(--vp-c-brand) 6%, transparent);
  box-shadow: var(--vp-shadow-2);
}

.overview-link .title {
  display: flex;
  align-items: center;
  gap: 6px;
}

.overview-link .title::after {
  content: '';
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E") center / contain no-repeat;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s, transform 0.25s ease;
  transition-duration: 0.25s !important;
}

.overview-link:hover .title::after,
.overview-link:focus-visible .title::after {
  opacity: 1;
  transform: translateX(0);
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}
</style>
