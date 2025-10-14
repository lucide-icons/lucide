<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

defineProps<{
  href?: string
  title?: string
  desc?: string
}>()
</script>

<template>
  <VPLink
    class="overview-link"
    :href="href"
    :aria-label="`${title} - ${desc}`"
  >
    <span class="title">
      {{ title }}
    </span>
    <span
      class="desc">
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
  transition: border-color 0.25s;
  text-decoration: none;
}

.overview-link:hover {
  border-color: var(--vp-c-brand-1);
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
  margin-bottom: 2px;
}
</style>
