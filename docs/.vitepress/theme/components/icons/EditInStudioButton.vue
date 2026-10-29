<script setup lang="ts">
import { pencilSparkles } from '../../../data/iconNodes';
import { IconEntity } from '../../types';
import getStudioLink from '../../utils/getStudioLink';
import Button from '../base/Button.vue';
import Icon from '@lucide/vue/src/Icon.ts';
import { track } from '../../utils/openpanel';

const props = defineProps<{
  icon: IconEntity;
}>();

function onClick() {
  track('icon_edit_in_studio_click', { icon: props.icon.name });
}
</script>

<template>
  <Button
    :href="getStudioLink(icon.name, icon.iconNode, 'icon-info')"
    target="_blank"
    rel="noopener noreferrer"
    @click="onClick"
  >
    <Icon
      :iconNode="pencilSparkles"
      name="pencil-sparkles"
      :size="24"
    />
    <span class="text">Edit in studio</span>
  </Button>
</template>

<style scoped>
.text {
  margin: 0 4px;
}
</style>
