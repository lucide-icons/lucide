<script setup>
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import { search }  from '../../../data/iconNodes'

const SearchIcon = createLucideIcon('search', search)

defineProps({
  shortcut: {
    type: String,
    required: false
  }
})
</script>

<template>
  <button class="fake-input">
    <component :is="SearchIcon" class="search-icon"/>
    <slot/>
    <kbd v-if="shortcut" class="shortcut">{{ shortcut }}</kbd>
  </button>
</template>

<style scoped>
.fake-input {
  background: var(--vp-c-bg-soft);
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
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.fake-input:hover, .fake-input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
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
