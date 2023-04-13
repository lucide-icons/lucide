<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IconEntity } from '../types'
import IconItem from './IconItem.vue'
import IconDetailOverlay from './IconDetailOverlay.vue'

const props = defineProps<{
  icons: IconEntity[]
}>()

const activeIconName = ref('')

function setActiveIconName(name: string) {
  activeIconName.value = name
}

const activeIcon = computed(() =>
  props.icons.find((icon) => icon.name === activeIconName.value)
)

</script>

<template>
  <div class="icons">
    <div class="icon" v-for="icon in icons" :key="icon.name">
      <IconItem v-bind="icon" @setActiveIcon="setActiveIconName" :active="activeIconName === icon.name"/>
    </div>
  </div>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  padding: 32px 32px 96px;
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}
</style>
