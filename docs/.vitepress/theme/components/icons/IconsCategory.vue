<script setup lang="ts">
import { ref } from 'vue';
import { Category } from '../../types';
import IconGrid from './IconGrid.vue'
import { vIntersectionObserver } from '@vueuse/components'

defineProps<{
  activeIconName: string
  category: Category
}>()

const emit = defineEmits(['setActiveIcon'])

const showIcons = ref(false)

// Added intersection observer to improve performance
const onIntersectionObserver: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  showIcons.value = isIntersecting
}
</script>

<template>
  <section
    class="category"
    :key="category.name"
    :id="category.name"
    v-intersection-observer="onIntersectionObserver"
  >
    <h2 class="title" >
      <a class="header-anchor" :href="`#${category.name}`" :aria-label="`Permalink to &quot;${category.title}&quot;`">&ZeroWidthSpace;</a>
      {{ category.title }}
    </h2>
    <IconGrid
      :activeIcon="activeIconName"
      :icons="category.icons"
      @setActiveIcon="$event => $emit('setActiveIcon', $event)"
      overlayMode
      :hideIcons="!showIcons"
    />
  </section>
</template>

<style scoped>
.title {
  margin-bottom: 8px;
  font-size: 19px;
  font-weight: 500;
  padding: 24px 0 8px;
}

</style>
