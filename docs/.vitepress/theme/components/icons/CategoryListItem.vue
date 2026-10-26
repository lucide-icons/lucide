<script setup lang="ts">
import { useCategoryView } from '../../composables/useCategoryView';

interface Header {
  level: number;
  title: string;
  slug: string;
  iconCount: number;
  link: string;
  name: string;
  children: Header[];
}

type MenuItem = Omit<Header, 'slug' | 'children'> & {
  children?: MenuItem[];
};

defineProps<{
  headers: MenuItem[];
  root?: boolean;
}>();

const { selectedCategory } = useCategoryView();

function onClick(categoryName: string) {
  selectedCategory.value = categoryName;

  const heading = document.querySelector<HTMLAnchorElement>(categoryName);
  heading?.focus();

  const url = new URL(window.location.href);
  url.pathname = '/icons/categories';
  url.hash = categoryName;
  window.history.pushState({}, '', url);
}
</script>

<template>
  <ul :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title, iconCount, name } in headers">
      <a
        class="outline-link"
        :href="link"
        @click="onClick(name)"
        :title="title"
        :class="{
          inactive: iconCount === 0,
        }"
      >
        <span>
          {{ title }}
        </span>
        <span class="icon-count" :aria-label="`Count of icons in ${title}`">
          {{ iconCount }}
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 13px;
}

/* Each category is a soft pill on hover: the name slides in a little and the count badge
   takes the brand colour. The category in view keeps the brand colour. */
.outline-link {
  display: flex;
  align-items: center;
  margin: 1px -8px;
  padding: 0 6px 0 8px;
  line-height: 26px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 6px;
  transition:
    color 0.25s,
    background-color 0.25s;
  transition-duration: 0.25s !important;
  font-weight: 500;
}

.outline-link > span:first-child {
  transition: transform 0.25s ease;
  transition-duration: 0.25s !important;
}

.outline-link:hover,
.outline-link:focus-visible {
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.outline-link:hover > span:first-child,
.outline-link:focus-visible > span:first-child {
  transform: translateX(3px);
}

.outline-link.active {
  color: var(--vp-c-brand-1);
}

.outline-link.inactive {
  color: var(--vp-c-text-4);
  pointer-events: none;
}

.outline-link.nested {
  padding-left: 13px;
}

.icon-count {
  margin-left: auto;
  padding: 0 6px;
  min-width: 26px;
  line-height: 18px;
  text-align: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  border-radius: 9px;
  transition:
    color 0.25s,
    background-color 0.25s;
  transition-duration: 0.25s !important;
}

.outline-link:hover .icon-count,
.outline-link:focus-visible .icon-count,
.outline-link.active .icon-count {
  color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand) 14%, transparent);
}

.outline-link.inactive .icon-count {
  opacity: 0;
}
</style>
