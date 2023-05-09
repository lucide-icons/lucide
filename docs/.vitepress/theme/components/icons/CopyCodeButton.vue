<script setup lang="ts">
import { computed, ref } from 'vue';
import { startCase, camelCase } from 'lodash-es'
import ButtonMenu from '../base/ButtonMenu.vue'
import { useIconStyleContext } from '../../composables/useIconStyle';

const props = defineProps<{
  name: string
  popoverPosition?: 'top' | 'bottom'
}>()
const { size, color, strokeWidth } = useIconStyleContext()
const animate = ref(false)
const componentName = computed(() => {
  return startCase(camelCase(props.name)).replace(/\s/g, '')
})

function copyJSX() {
  let attrs = ['']

  if (size.value && size.value !== 24) {
    attrs.push(`size={${size.value}}`)
  }

  if (color.value && color.value !== 'currentColor') {
    attrs.push(`color="${color.value}"`)
  }

  if (strokeWidth.value && strokeWidth.value !== 2) {
    attrs.push(`strokeWidth={${strokeWidth.value}}`)
  }

  const code = `<${componentName.value}${attrs.join(' ')} />`

  navigator.clipboard.writeText(code)
}

function copyVue() {
  let attrs = ['']

  if (size.value && size.value !== 24) {
    attrs.push(`:size="${size.value}"`)
  }

  if (color.value && color.value !== 'currentColor') {
    attrs.push(`color="${color.value}"`)
  }

  if (strokeWidth.value && strokeWidth.value !== 2) {
    attrs.push(`:stroke-width="${strokeWidth.value}"`)
  }

  const code = `<${componentName.value}${attrs.join(' ')} />`

  navigator.clipboard.writeText(code)
}

// TODO: This function should be moved to a composable, together with the styling
function confetti(e) {
  animate.value = true;

  setTimeout(function () {
    animate.value = false;
  }, 1000);
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
      { text: 'Copy JSX' , onClick: copyJSX },
      { text: 'Copy Vue' , onClick: copyVue },
      { text: 'Copy Svelte' , onClick: copyJSX },
    ]"
  />
</template>

<style src="./confetti.css" />
