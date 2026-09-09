<script setup lang="ts">
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import FakeInput from '../base/FakeInput.vue';
import { useRouter } from 'vitepress';
import { data } from '../home/HomeHeroIconsCard.data'
import { useScroll } from '@vueuse/core';
import { computed } from 'vue';
const { go } = useRouter()

const { frontmatter: fm } = useData()
const { x, y, isScrolling, arrivedState, directions } = useScroll(window)

const opacity = computed(() => {
  if (y.value < 0) return 1
  if (y.value > 300) return 0
  return 1 - (y.value / 300)
})
</script>

<template>
  <VPHero v-if="fm.hero" class="VPHomeHero" :name="fm.hero.name" :text="fm.hero.text" :tagline="fm.hero.tagline"
    :image="undefined" :actions="fm.hero.actions">
    <template #home-hero-image></template>
    <template #home-hero-actions-after>
      <FakeInput @click="go('/icons/?focus')" class="search-box">
        Search {{ data.iconsCount }} icons...
      </FakeInput>
    </template>

  </VPHero>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 48 48" fill="none" overflow="auto"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hero-background" :style="{ opacity: opacity }">
    <g class="svg-preview-grid-group" stroke-linecap="butt" stroke-width="0.1" stroke="#777"
       stroke-opacity="0.3">
      <!-- <rect class="svg-preview-grid-rect" width="23.9" height="23.9" x="0.05" y="0.05" rx="1"></rect> -->
      <path
        stroke-dasharray="0 0.1 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0 0.15"
        stroke-width="0.1"
        d="M1 0.1v23.8M2 0.1v23.8M4 0.1v23.8M5 0.1v23.8M7 0.1v23.8M8 0.1v23.8M10 0.1v23.8M11 0.1v23.8M13 0.1v23.8M14 0.1v23.8M16 0.1v23.8M17 0.1v23.8M19 0.1v23.8M20 0.1v23.8M22 0.1v23.8M23 0.1v23.8M0.1 1h23.8M0.1 2h23.8M0.1 4h23.8M0.1 5h23.8M0.1 7h23.8M0.1 8h23.8M0.1 10h23.8M0.1 11h23.8M0.1 13h23.8M0.1 14h23.8M0.1 16h23.8M0.1 17h23.8M0.1 19h23.8M0.1 20h23.8M0.1 22h23.8M0.1 23h23.8">
      </path>
      <path
        d="M3 0.1v23.8M6 0.1v23.8M9 0.1v23.8M12 0.1v23.8M15 0.1v23.8M18 0.1v23.8M21 0.1v23.8M0.1 3h23.8M0.1 6h23.8M0.1 9h23.8M0.1 12h23.8M0.1 15h23.8M0.1 18h23.8M0.1 21h23.8">
      </path>
    </g>
    <g class="svg-preview-shadow-mask-group" stroke-width="4" stroke="#777" stroke-opacity="0.15">
      <mask id="svg-preview-shadow-mask-0" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M4.9 16.1h.01M4.9 1.9h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-1" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M7.8 4.7h.01M7 12.2h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-2" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M12 7h.01M14 9h.01M12 11h.01M10 9h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-3" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M16.2 4.8h.01M17 12.27h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-4" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M19.1 1.9h.01M19.1 16h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-5" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M9.5 18h.01M14.5 18h.01"></path>
      </mask>
      <mask id="svg-preview-shadow-mask-6" maskUnits="userSpaceOnUse" stroke-opacity="1" stroke-width="4" stroke="#000">
        <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
        <path d="M8 22h.01M12 11h.01M16 22h.01"></path>
      </mask>
    </g>
    <!-- <g class="svg-preview-shadow-group" stroke-width="4" stroke="#777" stroke-opacity="0.15">
      <path mask="url(#svg-preview-shadow-mask-0)" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
      <path mask="url(#svg-preview-shadow-mask-1)" d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2"></path>
      <path mask="url(#svg-preview-shadow-mask-2)" d="M 12 7 A2 2 0 0 1 14 9"></path>
      <path mask="url(#svg-preview-shadow-mask-2)" d="M 14 9 A2 2 0 0 1 12 11"></path>
      <path mask="url(#svg-preview-shadow-mask-2)" d="M 12 11 A2 2 0 0 1 10 9"></path>
      <path mask="url(#svg-preview-shadow-mask-2)" d="M 10 9 A2 2 0 0 1 12 7"></path>
      <path mask="url(#svg-preview-shadow-mask-3)" d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27"></path>
      <path mask="url(#svg-preview-shadow-mask-4)" d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16"></path>
      <path mask="url(#svg-preview-shadow-mask-5)" d="M 9.5 18 L 14.5 18"></path>
      <path mask="url(#svg-preview-shadow-mask-6)" d="M 8 22 L 12 11"></path>
      <path mask="url(#svg-preview-shadow-mask-6)" d="M 12 11 L 16 22"></path>
      <path
        d="M4.9 16.1h.01M4.9 1.9h.01M7.8 4.7h.01M7 12.2h.01M12 7h.01M14 9h.01M12 11h.01M10 9h.01M16.2 4.8h.01M17 12.27h.01M19.1 1.9h.01M19.1 16h.01M9.5 18h.01M14.5 18h.01M8 22h.01M16 22h.01">
      </path>
    </g> -->
    <g>
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern id="backdrop-pattern-:R4:" width=".1" height=".1" patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 50 50)">
          <line stroke="red" stroke-width="0.1" y2="1"></line>
          <line stroke="red" stroke-width="0.1" y2="1"></line>
        </pattern>
      </defs>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-0" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
        </mask>
        <path d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-0)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-0" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
        </mask>
        <path
          d="M 12 7 A2 2 0 0 1 14 9 M 14 9 A2 2 0 0 1 12 11 M 12 11 A2 2 0 0 1 10 9 M 10 9 A2 2 0 0 1 12 7 M 8 22 L 12 11 M 12 11 L 16 22 M 9.5 18 L 14.5 18"
          stroke="url(#backdrop-pattern-:R4:)" stroke-width="4" stroke-opacity="0.75"
          mask="url(#svg-preview-backdrop-mask-:R4:-0)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-1" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2"></path>
        </mask>
        <path
          d="M 12 7 A2 2 0 0 1 14 9 M 14 9 A2 2 0 0 1 12 11 M 12 11 A2 2 0 0 1 10 9 M 10 9 A2 2 0 0 1 12 7 M 8 22 L 12 11 M 12 11 L 16 22 M 9.5 18 L 14.5 18"
          stroke="url(#backdrop-pattern-:R4:)" stroke-width="4" stroke-opacity="0.75"
          mask="url(#svg-preview-backdrop-mask-:R4:-1)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-0" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
        </mask>
        <path d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-0)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-1" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2"></path>
        </mask>
        <path d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-1)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-2" maskUnits="userSpaceOnUse">
          <path stroke="white"
            d="M 12 7 A2 2 0 0 1 14 9 M 14 9 A2 2 0 0 1 12 11 M 12 11 A2 2 0 0 1 10 9 M 10 9 A2 2 0 0 1 12 7 M 8 22 L 12 11 M 12 11 L 16 22 M 9.5 18 L 14.5 18">
          </path>
        </mask>
        <path d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-2)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-0" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
        </mask>
        <path d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-0)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-1" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2"></path>
        </mask>
        <path d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-1)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-2" maskUnits="userSpaceOnUse">
          <path stroke="white"
            d="M 12 7 A2 2 0 0 1 14 9 M 14 9 A2 2 0 0 1 12 11 M 12 11 A2 2 0 0 1 10 9 M 10 9 A2 2 0 0 1 12 7 M 8 22 L 12 11 M 12 11 L 16 22 M 9.5 18 L 14.5 18">
          </path>
        </mask>
        <path d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-2)"></path>
      </g>
      <g stroke-width="4">
        <mask id="svg-preview-backdrop-mask-:R4:-3" maskUnits="userSpaceOnUse">
          <path stroke="white" d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27"></path>
        </mask>
        <path d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16" stroke="url(#backdrop-pattern-:R4:)" stroke-width="4"
          stroke-opacity="0.75" mask="url(#svg-preview-backdrop-mask-:R4:-3)"></path>
      </g>
    </g>
    <g class="svg-preview-handles-group" stroke-width="0.12" stroke="#777" stroke-opacity="0.6">
      <path d="M4.9 16.1 1 12.2"></path>
      <circle cy="12.2" cx="1" r="0.25"></circle>
      <path d="M4.9 1.9 1 5.8"></path>
      <circle cy="5.8" cx="1" r="0.25"></circle>
      <path d="M16.2 4.8 18.2 6.8"></path>
      <circle cy="6.8" cx="18.2" r="0.25"></circle>
      <path d="M17 12.27 18.46 9.91"></path>
      <circle cy="9.91" cx="18.46" r="0.25"></circle>
    </g>
    <g class="svg-preview-colored-path-group">
      <path d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9" stroke="##dfdfd6"></path>
      <path d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2" stroke="##dfdfd6"></path>
      <path d="M 12 7 A2 2 0 0 1 14 9" stroke="##dfdfd6"></path>
      <path d="M 14 9 A2 2 0 0 1 12 11" stroke="##dfdfd6"></path>
      <path d="M 12 11 A2 2 0 0 1 10 9" stroke="##dfdfd6"></path>
      <path d="M 10 9 A2 2 0 0 1 12 7" stroke="##dfdfd6"></path>
      <path d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27" stroke="##dfdfd6"></path>
      <path d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16" stroke="##dfdfd6"></path>
      <path d="M 9.5 18 L 14.5 18" stroke="##dfdfd6"></path>
      <path d="M 8 22 L 12 11" stroke="##dfdfd6"></path>
      <path d="M 12 11 L 16 22" stroke="##dfdfd6"></path>
    </g>
    <g class="svg-preview-radii-group" stroke-width="0.12" stroke-dasharray="0 0.25 0.25" stroke="#777"
      stroke-opacity="0.3">
      <circle cx="9.518750780437157" cy="16.261333416579962" r="0.25"></circle>
      <circle cx="11.118750780437157" cy="1.261333416579964" r="0.25"></circle>
      <path
        d="M9.518750780437157 16.261333416579962L4.481249219562843 8.138666583420036L11.118750780437157 1.261333416579964">
      </path>
      <circle cx="4.481249219562843" cy="8.138666583420036" r="0.25"></circle>
      <path d="M7 12.2L12.217985863765243 8.963918492134958L7.8 4.7"></path>
      <circle cy="8.963918492134958" cx="12.217985863765243" r="0.25" stroke-dasharray="0" stroke="red"></circle>
      <circle cy="8.963918492134958" cx="12.217985863765243" r="6.14" stroke="red"></circle>
      <circle cy="9" cx="12" r="0.25" stroke-dasharray="0"></circle>
      <circle cy="9" cx="12" r="2"></circle>
      <circle cy="9" cx="12" r="0.25" stroke-dasharray="0"></circle>
      <circle cy="9" cx="12" r="2"></circle>
      <circle cy="9" cx="12" r="0.25" stroke-dasharray="0"></circle>
      <circle cy="9" cx="12" r="2"></circle>
      <circle cy="9" cx="12" r="0.25" stroke-dasharray="0"></circle>
      <circle cy="9" cx="12" r="2"></circle>
      <circle cx="12.035530040810755" cy="23.05" r="0.25"></circle>
      <circle cx="12.035530040810755" cy="-5.1499999999999995" r="0.25"></circle>
      <path d="M12.035530040810755 23.05L26.164469959189248 8.95L12.035530040810755 -5.1499999999999995"></path>
      <circle cx="26.164469959189248" cy="8.95" r="0.25"></circle>
      <path d="M19.1 16L12.064440320770494 8.95L19.1 1.9"></path>
      <circle cy="8.95" cx="12.064440320770494" r="0.25" stroke-dasharray="0" stroke="red"></circle>
      <circle cy="8.95" cx="12.064440320770494" r="9.96" stroke="red"></circle>
    </g>
    <g class="svg-preview-control-path-marker-mask-group" stroke-width="1" stroke="#000">
      <mask id="svg-preview-control-path-marker-mask-0" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M4.9 16.1h.01"></path>
        <path d="M4.9 1.9h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-1" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M7.8 4.7h.01"></path>
        <path d="M7 12.2h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-6" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M16.2 4.8h.01"></path>
        <path d="M17 12.27h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-7" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M19.1 1.9h.01"></path>
        <path d="M19.1 16h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-8" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M9.5 18h.01"></path>
        <path d="M14.5 18h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-9" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M8 22h.01"></path>
        <path d="M12 11h.01"></path>
      </mask>
      <mask id="svg-preview-control-path-marker-mask-10" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="100%" height="100%" fill="#ccc" stroke="none" rx="1"></rect>
        <path d="M12 11h.01"></path>
        <path d="M16 22h.01"></path>
      </mask>
    </g>
    <g class="svg-preview-control-path-group" stroke="#fff" stroke-width="0.125">
      <path mask="url(#svg-preview-control-path-marker-mask-0)" d="M 4.9 16.1 C1 12.2 1 5.8 4.9 1.9"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-1)" d="M 7.8 4.7 A6.14 6.14 0 0 0 7 12.2"></path>
      <path d="M 12 7 A2 2 0 0 1 14 9"></path>
      <path d="M 14 9 A2 2 0 0 1 12 11"></path>
      <path d="M 12 11 A2 2 0 0 1 10 9"></path>
      <path d="M 10 9 A2 2 0 0 1 12 7"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-6)" d="M 16.2 4.8 C18.2 6.8 18.46 9.91 17 12.27"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-7)" d="M 19.1 1.9 A9.96 9.96 0 0 1 19.1 16"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-8)" d="M 9.5 18 L 14.5 18"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-9)" d="M 8 22 L 12 11"></path>
      <path mask="url(#svg-preview-control-path-marker-mask-10)" d="M 12 11 L 16 22"></path>
    </g>
    <g class="svg-preview-control-path-marker-group" stroke="#fff" stroke-width="0.125">
      <path
        d="M4.9 16.1h.01M4.9 1.9h.01M7.8 4.7h.01M7 12.2h.01M16.2 4.8h.01M17 12.27h.01M19.1 1.9h.01M19.1 16h.01M9.5 18h.01M14.5 18h.01M8 22h.01M12 11h.01M12 11h.01M16 22h.01">
      </path>
      <circle cx="4.9" cy="16.1" r="0.5"></circle>
      <circle cx="4.9" cy="1.9" r="0.5"></circle>
      <circle cx="7.8" cy="4.7" r="0.5"></circle>
      <circle cx="7" cy="12.2" r="0.5"></circle>
      <circle cx="16.2" cy="4.8" r="0.5"></circle>
      <circle cx="17" cy="12.27" r="0.5"></circle>
      <circle cx="19.1" cy="1.9" r="0.5"></circle>
      <circle cx="19.1" cy="16" r="0.5"></circle>
      <circle cx="9.5" cy="18" r="0.5"></circle>
      <circle cx="14.5" cy="18" r="0.5"></circle>
      <circle cx="8" cy="22" r="0.5"></circle>
      <circle cx="16" cy="22" r="0.5"></circle>
    </g>
    <g class="svg-preview-handles-group" stroke-width="0.12" style="stroke: var(--vp-c-brand)" stroke-opacity="0.3">
      <path d="M4.9 16.1 1 12.2"></path>
      <circle cy="12.2" cx="1" r="0.25"></circle>
      <path d="M4.9 1.9 1 5.8"></path>
      <circle cy="5.8" cx="1" r="0.25"></circle>
      <path d="M16.2 4.8 18.2 6.8"></path>
      <circle cy="6.8" cx="18.2" r="0.25"></circle>
      <path d="M17 12.27 18.46 9.91"></path>
      <circle cy="9.91" cx="18.46" r="0.25"></circle>
    </g>
  </svg>
</template>

<style>
.hero {
  overflow: hidden;
  height: 60vh;
  display: flex;
  position: relative;
  /* align-items: center;
  justify-content: center; */
}

.hero-background {
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  position: fixed;
  top: -240px;
  right: -320px;
  width: 112vw;
  height: 112vh;
}

.hero-title {
  font-size: 3.2rem;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
  max-width: 800px;
}

/* .VPHomeHero .image {
  display: none;
}

.VPHomeHero .container {
  justify-content: center;
  text-align: center;
}

.VPHomeHero .main {
  text-align: center;
} */

/* .VPHomeHero .container .actions {
  justify-content: center;
} */
/*
@media (min-width: 960px) {
.VPHomeHero :deep(.actions) {
  justify-content: center;
}
} */

@media screen and (prefers-color-scheme: light) {
    .svg-preview-grid-rect { fill: none }
  }
  @media screen and (prefers-color-scheme: dark) {
    .svg-preview-grid-rect { fill: none }
    .svg
    .svg-preview-grid-group,
    .svg-preview-radii-group,
    .svg-preview-shadow-mask-group,
    .svg-preview-shadow-group {
      stroke: #fff;
    }
  }

.search-box {
  /* width: calc(100vw - 272px); */
  width: 100%;
  margin-top: 24px;
}
</style>
