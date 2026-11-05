<script setup lang="ts">
import { computed } from 'vue';
import { toPascalCase } from '@lucide/shared';
import ButtonMenu from '../base/ButtonMenu.vue';
import { useIconStyleContext } from '../../composables/useIconStyle';
import useConfetti from '../../composables/useConfetti';
import { track } from '../../utils/openpanel';

const props = defineProps<{
  name: string;
  popoverPosition?: 'top' | 'bottom';
  trackingSource?: 'drawer' | 'page';
}>();

function trackCopy(action: string) {
  track('icon_copy', { icon: props.name, action, source: props.trackingSource });
}

const { size, color, strokeWidth, nonScalingStroke } = useIconStyleContext();
const { animate, confetti } = useConfetti();
const componentName = computed(() => {
  return (toPascalCase(props.name) as string).replace(/\s/g, '');
});

function copyJSX() {
  let attrs = [''];

  if (size.value && size.value !== 24) {
    attrs.push(`size={${size.value}}`);
  }

  if (color.value && color.value !== 'currentColor') {
    attrs.push(`color="${color.value}"`);
  }

  if (strokeWidth.value && strokeWidth.value !== 2) {
    attrs.push(`strokeWidth={${strokeWidth.value}}`);
  }

  if (nonScalingStroke.value) {
    attrs.push(`nonScalingStroke`);
  }

  const code = `<${componentName.value}${attrs.join(' ')} />`;

  navigator.clipboard.writeText(code);
}

function copyComponentName() {
  trackCopy('copy_component_name');
  const code = componentName.value;

  navigator.clipboard.writeText(code);
}

function copyVue() {
  trackCopy('copy_vue');
  let attrs = [''];

  if (size.value && size.value !== 24) {
    attrs.push(`:size="${size.value}"`);
  }

  if (color.value && color.value !== 'currentColor') {
    attrs.push(`color="${color.value}"`);
  }

  if (strokeWidth.value && strokeWidth.value !== 2) {
    attrs.push(`:stroke-width="${strokeWidth.value}"`);
  }

  if (nonScalingStroke.value) {
    attrs.push(`nonScalingStroke`);
  }

  const code = `<${componentName.value}${attrs.join(' ')} />`;

  navigator.clipboard.writeText(code);
}

function copyAngular() {
  trackCopy('copy_angular');
  let attrs = [''];

  attrs.push(`name="${props.name}"`);

  if (size.value && size.value !== 24) {
    attrs.push(`[size]="${size.value}"`);
  }

  if (color.value && color.value !== 'currentColor') {
    attrs.push(`color="${color.value}"`);
  }

  if (strokeWidth.value && strokeWidth.value !== 2) {
    attrs.push(`[strokeWidth]="${strokeWidth.value}"`);
  }

  if (nonScalingStroke.value) {
    attrs.push(`[nonScalingStroke]="true"`);
  }

  const code = `<lucide-icon${attrs.join(' ')}></lucide-icon>`;

  navigator.clipboard.writeText(code);
}
</script>

<template>
  <ButtonMenu
    :buttonClass="`confetti-button ${animate ? 'animate' : ''}`"
    id="copy-code-button"
    callOptionOnClick
    @click="confetti"
    @optionClick="confetti"
    data-confetti-text="Copied!"
    :popoverPosition="popoverPosition"
    :options="[
      { text: 'Copy JSX', onClick: () => (trackCopy('copy_jsx'), copyJSX()) },
      { text: 'Copy Component Name', onClick: copyComponentName },
      { text: 'Copy Vue', onClick: copyVue },
      { text: 'Copy Svelte', onClick: () => (trackCopy('copy_svelte'), copyJSX()) },
      { text: 'Copy Angular', onClick: copyAngular },
    ]"
  />
</template>

<style src="./confetti.css" />
