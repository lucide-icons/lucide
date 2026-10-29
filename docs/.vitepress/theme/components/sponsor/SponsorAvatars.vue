<script setup lang="ts">
import { computed } from 'vue';
import { getSupporters } from './sponsors';
import { OPEN_COLLECTIVE_URL } from './tiers';

const props = withDefaults(
  defineProps<{
    title?: string;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    /** Maximum number of avatars shown before "and N more". */
    max?: number;
  }>(),
  {
    title: 'Backers and supporters',
    headingLevel: 3,
    max: 48,
  },
);

const supporters = getSupporters();

const visibleSupporters = computed(() => supporters.slice(0, props.max));
const remainingCount = computed(() => supporters.length - visibleSupporters.value.length);
const headingElement = computed(() => `h${props.headingLevel}`);
</script>

<template>
  <div
    v-if="supporters.length"
    class="avatars"
  >
    <component
      :is="headingElement"
      class="title"
    >
      {{ title }}
    </component>
    <div class="list">
      <a
        v-for="supporter in visibleSupporters"
        :key="supporter.slug"
        :href="supporter.website"
        :title="supporter.name"
        target="_blank"
        rel="noreferrer noopener"
        class="avatar-link"
      >
        <img
          :src="supporter.avatar"
          :alt="supporter.name"
          width="40"
          height="40"
          class="avatar"
          loading="lazy"
        />
      </a>
      <a
        v-if="remainingCount > 0"
        :href="OPEN_COLLECTIVE_URL"
        target="_blank"
        rel="noreferrer"
        class="more"
      >
        and {{ remainingCount }} more
      </a>
    </div>
  </div>
</template>

<style scoped>
.avatars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.avatar-link {
  display: block;
  border-radius: 999px;
  transition: transform 0.25s;
}

.avatar-link:hover {
  transform: translateY(-2px);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
  background-color: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-bg);
}

.more {
  padding-left: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.more:hover {
  text-decoration: underline;
}
</style>
