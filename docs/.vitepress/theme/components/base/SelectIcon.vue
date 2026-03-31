<script setup lang="ts">
const { item } = defineProps<{
  item: {
    name: string;
    icon: string;
    iconDark?: string;
  };
}>();
</script>

<template>
  <img
    :src="item.icon"
    :class="{ 'select-item-icon': true, light: item.iconDark }"
    :alt="`${item.name} logo`"
    loading="lazy"
  />
  <img
    v-if="item.iconDark"
    :src="item.iconDark"
    :alt="`${item.name} logo`"
    class="select-item-icon dark"
  />
</template>

<style scoped>
.select-item-icon {
  object-fit: contain;
  width: 24px;
  height: 24px;
}

html.dark .select-item-icon.light {
  display: none;
}

html:not(.dark) .select-item-icon.dark {
  display: none;
}
</style>
