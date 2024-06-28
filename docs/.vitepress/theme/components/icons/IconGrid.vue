<script setup lang="ts">
import type { IconEntity } from '../../types'
import IconItem from './IconItem.vue'

const emit = defineEmits(['setActiveIcon'])

defineProps<{
  icons: IconEntity[]
  activeIcon?: string
  overlayMode?: boolean
  hideIcons?: boolean
}>()

function setActiveIcon(name: string) {
  emit('setActiveIcon', name)
}

</script>

<template>
  <div class="icons">
    <div
      class="icon"
      v-for="icon in icons"
      :key="icon.name"
    >
      <IconItem
        :iconNode="icon.iconNode"
        :name="icon.name"
        :externalLibrary="icon.externalLibrary"
        @setActiveIcon="setActiveIcon"
        :active="activeIcon === icon.name"
        customizable
        :overlayMode="overlayMode"
        :hideIcon="hideIcons"
      />
    </div>
  </div>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
  position: relative;
}
</style>
