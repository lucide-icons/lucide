<script setup>
import Icon from '@lucide/vue/src/Icon';
import { search } from '../../../data/iconNodes';

defineProps({
  shortcut: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <button class="fake-input">
    <Icon
      :iconNode="search"
      class="search-icon"
    />
    <slot />
    <kbd
      v-if="shortcut"
      class="shortcut"
      >{{ shortcut }}</kbd
    >
  </button>
</template>

<style scoped>
.fake-input {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 11px 16px;
  height: auto;
  font-size: 14px;
  /* box-shadow: var(--vp-shadow-4), var(--vp-shadow-2); */
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  cursor: text;
  display: flex;
  gap: 12px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s,
    box-shadow 0.25s;
  transition-duration: 0.25s !important;
}

/* A quiet border at rest; on hover the border takes the brand colour with a soft ring,
   and the search icon tilts as if it starts looking */
.fake-input:hover,
.fake-input:focus-visible {
  outline: none;
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
}

.search-icon {
  flex-shrink: 0;
  transition: color 0.25s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-duration: 0.25s, 0.3s !important;
}

.fake-input:hover .search-icon,
.fake-input:focus-visible .search-icon {
  color: var(--vp-c-brand-1);
  transform: rotate(-12deg) scale(1.1);
}

.shortcut {
  margin-left: auto;
  padding: 2px 6px;
  font-size: 12px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

@media (hover: none) {
  .shortcut {
    display: none;
  }
}
</style>
