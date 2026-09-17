<script setup lang="ts">
import createLucideIcon from '@lucide/vue/src/createLucideIcon';

export type IconNode = [elementName: string, attrs: Record<string, string>][];

const props = defineProps<{
  name: string;
  tags?: string[];
  categories?: string[];
  // contributors: Contributor[];
  iconNode: IconNode;
}>();

const icon = createLucideIcon(props.name, props.iconNode);
</script>

<template>
  <component :is="icon" />
</template>
