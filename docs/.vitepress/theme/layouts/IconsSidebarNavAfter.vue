<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import SidebarIconCustomizer from '../components/icons/SidebarIconCustomizer.vue'
import ExternalLibrarySelect from '../components/icons/SidebarExternalLibrarySelect.vue'
import CategoryList from '../components/icons/CategoryList.vue'
import KeyboardShortcutsHint from '../components/icons/KeyboardShortcutsHint.vue'

const { page } = useData()

const isIconsPage = computed(() => page.value?.relativePath?.startsWith?.('icons'))
</script>

<template>
  <div v-if="isIconsPage">
    <SidebarIconCustomizer/>
    <ExternalLibrarySelect/>
    <CategoryList/>
    <KeyboardShortcutsHint />
  </div>
</template>
