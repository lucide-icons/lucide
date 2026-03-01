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

  const searchParam = new URLSearchParams(window.location.search).get('search');
  let url = '/icons/categories';
  if (searchParam) {
    url += `?search=${encodeURIComponent(searchParam)}`;
  }
  url += `#${categoryName}`;
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

.outline-link {
  display: flex;
  align-items: baseline;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 500;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.outline-link.inactive {
  color: var(--vp-c-text-4);
  pointer-events: none;
}

.outline-link.nested {
  padding-left: 13px;
}

.icon-count {
  opacity: 0.5;
  margin-left: auto;
  font-size: 11px;
  font-weight: 400;
}

.outline-link.inactive .icon-count {
  opacity: 0;
}
</style>
