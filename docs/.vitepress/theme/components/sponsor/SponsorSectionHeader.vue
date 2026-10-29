<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="section-header">
    <h2 class="title">{{ title }}</h2>
    <p
      v-if="description"
      class="description"
    >
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 680px;
}

.title {
  margin: 0;
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.description {
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  color: var(--vp-c-text-2);
}
</style>
