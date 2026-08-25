<script setup lang="ts">
import type { IconEntity } from '../../types';
import IconListItem from './IconListItem.vue';

const emit = defineEmits(['setActiveIcon']);

defineProps<{
  icons: IconEntity[];
  activeIcon?: string;
  overlayMode?: boolean;
}>();

function setActiveIcon(name: string) {
  emit('setActiveIcon', name);
}
</script>

<template>
  <div class="icon-list">
    <div
      class="icon-list-row"
      v-for="icon in icons"
      :key="icon.name"
    >
      <IconListItem
        :iconNode="icon.iconNode"
        :name="icon.name"
        :aliases="icon.aliases"
        :deprecated="icon.deprecated"
        :externalLibrary="icon.externalLibrary"
        :active="activeIcon === icon.name"
        :overlayMode="overlayMode"
        @setActiveIcon="setActiveIcon"
      />
    </div>
  </div>
</template>

<style>
.icon-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
}

.icon-list-row {
  height: 48px;
  position: relative;
}
</style>
