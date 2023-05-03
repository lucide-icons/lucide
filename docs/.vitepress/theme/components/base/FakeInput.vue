<script setup>
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import { search }  from '../../../data/iconNodes'

const SearchIcon = createLucideIcon('search', search)
</script>

<template>
  <button class="fake-input">
    <component :is="SearchIcon" class="search-icon"/>
    <slot/>
  </button>
</template>

<style scoped>
.fake-input {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 12px 16px;
  height: auto;
  font-size: 14px;
  box-shadow: var(--vp-shadow-4), var(--vp-shadow-2);
  text-align: left;
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  gap: 12px;
}

.fake-input:hover, .fake-input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}
</style>
