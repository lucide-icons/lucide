<script setup lang="ts">
import { ref } from 'vue';
import ButtonMenu from '../base/ButtonMenu.vue'
import { useIconStyleContext } from '../../composables/useIconStyle';
import useConfetti from '../../composables/useConfetti';

const allowedAttrs = [
  'xmlns',
  'width',
  'height',
  'viewBox',
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'class',
]
const downloadText = 'Download!'
const copiedText = 'Copied!'
const confettiText = ref(copiedText)
const props = defineProps<{
  name: string
  popoverPosition?: 'top' | 'bottom'
}>()

const { size } = useIconStyleContext()

const { animate, confetti } = useConfetti()

function getSVGIcon() {
  const svg = document.querySelector('#previewer svg')
  if (!svg) return

  const clonedSvg = svg.cloneNode(true) as SVGElement

  // Filter out attributes that are not allowed in SVGs
  for (const attr of Array.from(clonedSvg.attributes)) {
    if (!allowedAttrs.includes(attr.name)) {
      clonedSvg.removeAttribute(attr.name)
    }
  }

  const svgString = new XMLSerializer().serializeToString(clonedSvg)

  return svgString
}

function copySVG() {
  confettiText.value = copiedText
  const svgString = getSVGIcon()

  navigator.clipboard.writeText(svgString)

  confetti()
}

function copyDataUrl() {
  confettiText.value = copiedText
  const svgString = getSVGIcon()

  // Create SVG data url
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`
  navigator.clipboard.writeText(dataUrl)

  confetti()
}

function downloadSVG() {
  confettiText.value = downloadText
  const svgString = getSVGIcon()

  const link = document.createElement('a');
  link.download = `${props.name}.svg`;
  link.href = `data:image/svg+xml;base64,${btoa(svgString)}`
  link.click();

  confetti()
}

function downloadPNG() {
  confettiText.value = downloadText
  const svgString = getSVGIcon()

  const canvas = document.createElement('canvas');
  canvas.width = size.value;
  canvas.height = size.value;
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
  image.onload = function() {
    ctx.drawImage(image, 0, 0);

    const link = document.createElement('a');
    link.download = `${props.name}.png`;
    link.href = canvas.toDataURL('image/png')
    link.click();

    confetti()
  }
}


</script>

<template>
  <ButtonMenu
    :buttonClass="`confetti-button ${animate ? 'animate' : ''}`"
    callOptionOnClick
    id="copy-svg-button"
    :data-confetti-text="confettiText"
    :popoverPosition="popoverPosition"
    :options="[
      { text: 'Copy SVG' , onClick: copySVG },
      { text: 'Copy Data URL' , onClick: copyDataUrl },
      { text: 'Download SVG' , onClick: downloadSVG },
      { text: 'Download PNG' , onClick: downloadPNG },
    ]"
  />
</template>

<style src="./confetti.css" />
