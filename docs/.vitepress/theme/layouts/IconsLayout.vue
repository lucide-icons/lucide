<script setup>
import { onMounted } from 'vue'
import { useData } from 'vitepress'

import VPDocAsideOutline from 'vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'

const data = useData()
const { isOpen, isSidebarEnabled } = useSidebar()

onMounted(() => {
  console.log('Data',data)
})
</script>

<template>
  <VPDocAsideOutline v-if="data.page?.relativePath?.startsWith?.('/icons')"/>
</template>
