<script setup lang="ts">
import { setLucideProps } from '../src/context';
import { House } from '../src/lucide-vue';

const props = defineProps<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>();

setLucideProps({
  size: 48,
  color: 'red',
  strokeWidth: 4,
})
</script>

<template>
  <House v-bind="props"/>
</template>
