<script setup lang="ts">
defineProps<{
  /** Full-bleed tinted background with divider borders. */
  band?: boolean;
  narrow?: boolean;
}>();
</script>

<template>
  <section
    class="sponsor-section"
    :class="{ band }"
  >
    <div
      class="inner"
      :class="{ narrow }"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sponsor-section {
  --sponsor-accent: var(--vp-c-brand-5);
  padding: 72px 24px;
}

html.dark .sponsor-section {
  --sponsor-accent: var(--vp-c-brand-1);
}

.sponsor-section.band {
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.inner {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.inner.narrow {
  max-width: 768px;
  gap: 24px;
}
</style>
