<script setup lang="ts">
import {ref} from 'vue'
import {bird} from '../../../data/iconNodes'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import {useEventListener} from '@vueuse/core'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'

defineProps<{
  searchQuery: string
}>()

defineEmits(['clear'])

const birdIcon = ref<HTMLElement>()
const Bird = createLucideIcon('bird', bird)
const flip = ref(false)

useEventListener(document, 'mousemove', (mouseEvent) => {
  const {width, height, x, y} = birdIcon.value.getBoundingClientRect()

  const centerX = (width / 2) + x

  flip.value = mouseEvent.x < centerX
})

</script>

<template>
  <div class="no-results">
    <Bird class="bird-icon" ref="birdIcon" :class="{ flip }" :strokeWidth="1"/>
    <h2 class="no-results-text">
      No icons found for '{{ searchQuery }}'
    </h2>
    <VPButton text="Clear your search and try again" theme="alt" @click="$emit('clear')"/>
    or
    <VPButton text="Check if someone has already requested this icon"
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

.bird-icon {
  width: 160px;
  height: 160px;
  color: var(--vp-c-neutral);
  opacity: 0.8;
  margin-top: 72px;
}

.bird-icon.flip {
  transform: rotateY(180deg);
}

@media (min-width: 960px) {
  .bird-icon {
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
</style>
