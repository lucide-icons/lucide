<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import SidebarIconCustomizer from '../components/icons/SidebarIconCustomizer.vue';
import ExternalLibrarySelect from '../components/icons/SidebarExternalLibrarySelect.vue';
import CategoryList from '../components/icons/CategoryList.vue';
import KeyboardShortcuts from '../components/icons/KeyboardShortcuts.vue';

const { page } = useData();

const isIconsPage = computed(() => page.value?.relativePath?.startsWith?.('icons'));
</script>

<template>
  <div v-if="isIconsPage">
    <SidebarIconCustomizer />
    <ExternalLibrarySelect />
    <CategoryList />
    <KeyboardShortcuts />
  </div>
</template>
