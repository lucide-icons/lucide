<script setup lang="ts">
import type { IconEntity } from '../../types'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';

const props = defineProps<{
  name: IconEntity['name']
  iconNode: IconEntity['iconNode']
  customizable?: boolean
}>()

const Icon = createLucideIcon(props.name, props.iconNode)

</script>

<template>
  <div class="icons-small-preview">
    <div class="icon-wrapper">
      <Icon :size="48" class="lucide-icon"/>
    </div>
    <div class="icon-wrapper">
      <Icon :size="32" class="lucide-icon"/>
    </div>
    <div class="icon-wrapper">
      <Icon class="lucide-icon"/>
    </div>
  </div>
</template>

<style scoped>
.icons-small-preview {
  display: flex;
  width: 100%;
  height: 100%;
  /* align-items: center; */
  justify-content: center;
  gap: 24px;
  /* margin-top: 24px; */
}
.icon-wrapper {
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  display: inline-flex;
  width: 64px;
  height: 64px;
  font-size: 24px;
  color: var(--vp-c-text-1);
  align-items: center;
  justify-content: center;
}

.lucide-icon {
  will-change: width, height, stroke-width, stroke;
  color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2);
  /* Not sure if this is logical for 100% previews */
  /* width: calc(var(--customize-size, 24) * 1px);
  height: calc(var(--customize-size, 24) * 1px); */
}

html.absolute-stroke-width .lucide-icon {
  stroke-width: calc(var(--customize-strokeWidth, 2) * 24 / var(--customize-size, 24));
}
</style>
