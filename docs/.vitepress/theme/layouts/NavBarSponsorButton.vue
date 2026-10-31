<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import Icon from '@lucide/vue/src/Icon';
import { heart } from '../../data/iconNodes';

const { page } = useData();

const isActive = computed(() => page.value.relativePath === 'sponsor.md');
</script>

<template>
  <a
    href="/sponsor"
    class="sponsor-button"
    :class="{ active: isActive }"
    :aria-current="isActive ? 'page' : undefined"
  >
    <Icon
      :iconNode="heart"
      name="heart"
      :size="16"
      class="heart"
      aria-hidden="true"
    />
    <span class="label">Sponsor</span>
  </a>
</template>

<style scoped>
.sponsor-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition:
    border-color 0.25s,
    color 0.25s;
}

.heart {
  color: var(--vp-c-brand-3);
  transition:
    fill 0.25s,
    transform 0.25s;
}

.sponsor-button:hover,
.sponsor-button.active {
  border-color: var(--vp-c-brand-3);
}

.sponsor-button:hover .heart,
.sponsor-button.active .heart {
  fill: currentColor;
}

.sponsor-button:hover .heart {
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .sponsor-button {
    margin-left: 16px;
  }
}

/* The nav menu leaves no room for the label between tablet and desktop widths. */
@media (min-width: 768px) and (max-width: 959px) {
  .sponsor-button {
    justify-content: center;
    width: 32px;
    padding: 0;
    margin-left: 8px;
  }

  .label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
