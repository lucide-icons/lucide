<script setup lang="ts">
import { pencilSparkles } from '../../../data/iconNodes';
import { IconEntity } from '../../types';
import getStudioLink from '../../utils/getStudioLink';
import Button from '../base/Button.vue';
import Icon from '@lucide/vue/src/Icon.ts';

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
    <Icon :iconNode="pencilSparkles" :size="24" />
    <span class="text">Edit in studio</span>
  </Button>
</template>

<style scoped>
.text {
  margin: 0 4px;
}
</style>
