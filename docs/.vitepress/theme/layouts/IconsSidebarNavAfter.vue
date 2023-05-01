<script setup>
import { useData } from 'vitepress'

import CategoryList from '../../components/CategoryList.vue'
import SidebarIconCustomizer from '../../components/SidebarIconCustomizer.vue'

const { page } = useData()

</script>

<template>
  <div>
    <SidebarIconCustomizer v-if="page?.relativePath?.startsWith?.('icons')"/>
    <CategoryList v-if="page?.relativePath?.startsWith?.('icons')"/>
  </div>
</template>
