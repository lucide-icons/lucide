<script setup>
import { onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import IconPreview from './IconPreview.vue'

const { params } = useData()

onMounted(() => {
  console.log(params, 'data')
})
const tags = computed(() => {
  if (!params.tags) return []
  return params.tags.join(' • ')
})

</script>

<template>
  <!-- <PageContainer class="overview"> -->
    <IconPreview
      :name="$params.name"
      :iconNode="$params.iconNode"
      class="preview"
      customizable
    />
    <div class="details">
      <h1 class="title">
        {{ $params.name }}
      </h1>
    </div>
  <!-- </PageContainer> -->
</template>

<style scoped>

.overview {
  display: flex;
  gap: 32px;
}
.preview {
  flex: 1;
}
.details {
  flex: 2
}

.title {
  font-size: 32px;
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.2;
  color: var(--vp-text-color);
  font-family: monospace;
}

</style>
