---
layout: page
outlineTitle: Categories
---

<script setup>
import { onMounted } from 'vue'
import { data } from './index.data.ts'

const { categories, icons } = data
onMounted(() => {
  console.log(data)
})
</script>


<div class="VPDoc content">
  <section class="category" v-for="category in categories" :key="category.name">
    <h2 >{{ category.title }}</h2>
  </section>
</div>
