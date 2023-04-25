<script setup>
import { onMounted  } from 'vue'
import { useData } from 'vitepress'

import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import CategoriesList from '../../components/CategoriesList.vue'
import IconCustomizer from '../../components/IconCustomizer.vue'

const { frontmatter, page } = useData()
const { isOpen, isSidebarEnabled } = useSidebar()

onMounted(() => {
  console.log('Data',frontmatter)
})


</script>

<template>
  <div>
    <IconCustomizer/>
    <CategoriesList v-if="page?.relativePath?.startsWith?.('icons')"/>
  </div>
</template>
