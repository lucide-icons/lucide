<script setup>
import { useData } from 'vitepress'

import CategoryList from '../components/icons/CategoryList.vue'
import SidebarIconCustomizer from '../components/icons/SidebarIconCustomizer.vue'
import ExternalLibrarySelect from '../components/icons/SidebarExternalLibrarySelect.vue'

const { page } = useData()

</script>

<template>
  <div>
    <SidebarIconCustomizer v-if="page?.relativePath?.startsWith?.('icons')"/>
    <ExternalLibrarySelect v-if="page?.relativePath?.startsWith?.('icons')"/>
    <CategoryList v-if="page?.relativePath?.startsWith?.('icons')"/>
  </div>
</template>
