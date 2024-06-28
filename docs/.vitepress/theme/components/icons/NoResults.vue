<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { bird, squirrel, rabbit } from '../../../data/iconNodes'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import {useEventListener} from '@vueuse/core'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import { IconNode } from '../../types'

defineProps<{
  searchQuery: string
}>()

defineEmits(['clear'])

const animalIcon = ref<HTMLElement>()
const randomAnimal = computed<IconNode>(() => {
  return Math.random() > 0.5 ? squirrel : Math.random() > 0.5 ? rabbit : bird
})
const animalComponent = computed(() => createLucideIcon('animal', randomAnimal.value))
const flip = ref(false)

onMounted(() => {
  useEventListener(document, 'mousemove', (mouseEvent) => {
    const {width, height, x, y} = animalIcon.value.getBoundingClientRect()

    const centerX = (width / 2) + x

    flip.value = mouseEvent.x < centerX
  })
})

</script>

<template>
  <div class="no-results">
    <component
      :is="animalComponent"
      class="animal-icon"
      ref="animalIcon"
      :class="{ flip }"
      :strokeWidth="1"
    />
    <h2 class="no-results-text">
      No icons found for '{{ searchQuery }}'
    </h2>
    <VPButton
      text="Clear your search and try again"
      theme="alt"
      @click="$emit('clear')"
    />
    <span class="text-divider">or</span>
    <VPButton
      text="Search on Github issues"
      theme="alt"
      :href="`https://github.com/lucide-icons/lucide/issues?q=is%3Aopen+${searchQuery}`"
      target="_blank"
    />
  </div>
</template>

<style scoped>
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.animal-icon {
  width: 160px;
  height: 160px;
  color: var(--vp-c-neutral);
  opacity: 0.8;
  margin-top: 72px;
}

.animal-icon.flip {
  transform: rotateY(180deg);
}

@media (min-width: 960px) {
  .animal-icon {
    width: 240px;
    height: 240px;
  }
}

.no-results-text {
  line-height: 40px;
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 32px;
  text-align: center;
}

.text-divider {
  margin: 12px 0;
  font-size: 16px;
  color: var(--vp-c-neutral);
}
</style>
