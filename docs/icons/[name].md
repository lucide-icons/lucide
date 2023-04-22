---
layout: doc
footer: false
editLink: false
next: false
prev: false
---

<script setup>
import { onMounted, computed } from 'vue'
import { useData } from 'vitepress'
// import { data } from './index.data.ts'
import IconPreview from '../.vitepress/components/IconPreview.vue'

const { params } = useData()

onMounted(() => {
  console.log(params, 'data')
})
const tags = computed(() => {
  if (!params.tags) return []
  return params.tags.join(' • ')
})

</script>



# {{ $params.name }} {#name}

<IconPreview :name="$params.name" :iconNode="$params.iconNode" />
