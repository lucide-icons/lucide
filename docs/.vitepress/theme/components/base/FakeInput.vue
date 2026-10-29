<script setup>
import Icon from '@lucide/vue/src/Icon';
import { search } from '../../../data/iconNodes';
import Kbd from './Kbd.vue';

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
    <Kbd
      v-if="shortcut"
      class="shortcut"
      >{{ shortcut }}</Kbd
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
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  gap: 12px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.fake-input:hover,
.fake-input:focus {
  border-color: var(--vp-c-brand);
}

.shortcut {
  margin-left: auto;
}

@media (hover: none) {
  .shortcut {
    display: none;
  }
}
</style>
