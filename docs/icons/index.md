---
layout: page
outline: 2
outlineTitle: Categories
---

<script setup>
import { onMounted } from 'vue'
import { data } from './index.data.ts'
import IconsOverview from '../.vitepress/components/IconsOverview.vue'

const { categories, icons } = data
onMounted(() => {
  console.log(data)
})
</script>

<IconsOverview :icons="icons" />
