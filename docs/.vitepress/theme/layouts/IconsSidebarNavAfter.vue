<script setup>
import { useData } from 'vitepress'

import CategoryList from '../../components/CategoryList.vue'
import IconCustomizer from '../../components/IconCustomizer.vue'

const { page } = useData()

</script>

<template>
  <div>
    <IconCustomizer v-if="page?.relativePath?.startsWith?.('icons')"/>
    <CategoryList v-if="page?.relativePath?.startsWith?.('icons')"/>
  </div>
</template>
