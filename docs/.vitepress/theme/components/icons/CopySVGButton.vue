<script setup lang="ts">
import { ref } from 'vue';
import ButtonMenu from '../base/ButtonMenu.vue'
import { useIconStyleContext } from '../../composables/useIconStyle';

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

const props = defineProps<{
  name: string
}>()

const { size } = useIconStyleContext()

const animate = ref(false)

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
  const svgString = getSVGIcon()

  navigator.clipboard.writeText(svgString)
}

function copyDataUrl() {
  const svgString = getSVGIcon()

  // Create SVG data url
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`
  navigator.clipboard.writeText(dataUrl)
}

function downloadSVG() {
  const svgString = getSVGIcon()

  const link = document.createElement('a');
  link.download = `${props.name}.svg`;
  link.href = `data:image/svg+xml;base64,${btoa(svgString)}`
  link.click();
}

function downloadPNG() {
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
  }
}

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
    callOptionOnClick
    @click="confetti"
    @optionClick="confetti"
    :options="[
      { text: 'Copy SVG' , onClick: copySVG },
      { text: 'Copy Data URL' , onClick: copyDataUrl },
      { text: 'Download SVG' , onClick: downloadSVG },
      { text: 'Download PNG' , onClick: downloadPNG },
    ]"
  />
</template>

<style>
.confetti-button {
  cursor: pointer;
  position: relative;
  --confetti-color: var(--vp-c-brand);
  --text-color: 0 0 0;
}

.dark .confetti-button {
  --confetti-color: var(--vp-c-brand-dark);
  --text-color: 255 255 255;
}
.confetti-button:before,
.confetti-button:after {
  position: absolute;
  content: "";
  display: block;
  width: 140%;
  height: 100%;
  left: -20%;
  z-index: -1000;
  transition: all ease-in-out 0.5s;
  background-repeat: no-repeat;
}

.confetti-button:before {
  content: "Copied!";
  letter-spacing: 1px;
  font-weight: bold;
  transform: rotate(-10deg);
  color: rgb(var(--text-color) / 1);
  display: none;
  top: -80%;
  background-image: radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, var(--confetti-color) 20%, transparent 30%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, var(--confetti-color) 15%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
    10% 10%, 18% 18%;
}

.confetti-button:after {
  display: none;
  bottom: -75%;
  background-image: radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, var(--confetti-color) 15%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%),
    radial-gradient(circle, var(--confetti-color) 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
}

.confetti-button.animate:before {
  display: block;
  animation: topBubbles ease-in-out 1s forwards;
}
.confetti-button.animate:after {
  display: block;
  animation: bottomBubbles ease-in-out 1s forwards;
}

@keyframes topBubbles {
  0% {
    color: rgb(var(--text-color) / 0);
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }
  30% {
    color: rgb(var(--text-color) / 1);
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    color: rgb(var(--text-color) / 0);
  }
}
@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
