<script setup lang="ts">
import { IconEntity } from '../../types';
import getStudioLink from '../../utils/getStudioLink';
import Button from '../base/Button.vue';
import BrushSparklesIcon from './BrushSparklesIcon';

defineProps<{
  icon: IconEntity
}>()
</script>

<template>
  <Button
    :href="getStudioLink(icon.name, icon.iconNode, 'icon-info')"
    target="_blank"
    rel="noopener noreferrer"
  >
    <BrushSparklesIcon :size="24" />
    <span class="text">Edit in studio</span>
  </Button>
</template>

<style scoped>
.text {
  margin: 0 4px;
}
</style>
