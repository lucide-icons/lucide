<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount, watchEffect, computed} from 'vue';
import { data } from './HomeHeroIconsCard.data'
import LucideIcon from '../base/LucideIcon.vue'
import { useRouter } from 'vitepress';
import { random } from 'lodash-es'
import FakeInput from '../base/FakeInput.vue'
import { useScroll } from '@vueuse/core';
import { motion, Variants } from "motion-v"

const { go } = useRouter()
const intervalTime = shallowRef()

const { y } = useScroll(window)

const opacity = computed(() => {
  if (y.value < 0) return 1
  if (y.value > 300) return 0
  return 1 - (y.value / 300)
})

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number = 1) => {
        const delay = i * 1
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 5, bounce: 0 },
                opacity: { delay, duration: 0.1 },
            },
        }
    },
}


</script>

<template>
  <div>
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 48 48" fill="none" overflow="auto"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hero-background"
      :style="{ opacity: opacity }">

      <g class="svg-preview-grid-group" stroke-linecap="butt" stroke-width="0.1" stroke="#777"
        mask="url(#svg-preview-bounding-box-mask)" stroke-opacity="0.3">
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
            <path stroke="white"
              d="M 14 12 C14 9.79086 12.2091 8 10 8 M 10 8 C7.79086 8 6 9.79086 6 12 M 6 12 C6 16.4183 9.58172 20 14 20 M 14 20 C18.4183 20 22 16.4183 22 12 M 22 12 C22 8.446 20.455 5.25285 18 3.05557">
            </path>
          </mask>
          <path
            d="M 10 12 C10 14.2091 11.7909 16 14 16 M 14 16 C16.2091 16 18 14.2091 18 12 M 18 12 C18 7.58172 14.4183 4 10 4 M 10 4 C5.58172 4 2 7.58172 2 12 M 2 12 C2 15.5841 3.57127 18.8012 6.06253 21"
            stroke="url(#backdrop-pattern-:R4:)" stroke-width="4" stroke-opacity="0.75"
            mask="url(#svg-preview-backdrop-mask-:R4:-0)"></path>
        </g>
      </g>
      <motion.svg class="svg-preview-handles-group" stroke-width="0.12" stroke="#777" stroke-opacity="0.6" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ delay: 2, duration: 1 }">
        <path d="M14 12 14 9.79086"></path>
        <circle cy="9.79086" cx="14" r="0.25"></circle>
        <path d="M10 8 12.2091 8"></path>
        <circle cy="8" cx="12.2091" r="0.25"></circle>
        <path d="M10 8 7.79086 8"></path>
        <circle cy="8" cx="7.79086" r="0.25"></circle>
        <path d="M6 12 6 9.79086"></path>
        <circle cy="9.79086" cx="6" r="0.25"></circle>
        <path d="M6 12 6 16.4183"></path>
        <circle cy="16.4183" cx="6" r="0.25"></circle>
        <path d="M14 20 9.58172 20"></path>
        <circle cy="20" cx="9.58172" r="0.25"></circle>
        <path d="M14 20 18.4183 20"></path>
        <circle cy="20" cx="18.4183" r="0.25"></circle>
        <path d="M22 12 22 16.4183"></path>
        <circle cy="16.4183" cx="22" r="0.25"></circle>
        <path d="M22 12 22 8.446"></path>
        <circle cy="8.446" cx="22" r="0.25"></circle>
        <path d="M18 3.05557 20.455 5.25285"></path>
        <circle cy="5.25285" cx="20.455" r="0.25"></circle>
        <path d="M10 12 10 14.2091"></path>
        <circle cy="14.2091" cx="10" r="0.25"></circle>
        <path d="M14 16 11.7909 16"></path>
        <circle cy="16" cx="11.7909" r="0.25"></circle>
        <path d="M14 16 16.2091 16"></path>
        <circle cy="16" cx="16.2091" r="0.25"></circle>
        <path d="M18 12 18 14.2091"></path>
        <circle cy="14.2091" cx="18" r="0.25"></circle>
        <path d="M18 12 18 7.58172"></path>
        <circle cy="7.58172" cx="18" r="0.25"></circle>
        <path d="M10 4 14.4183 4"></path>
        <circle cy="4" cx="14.4183" r="0.25"></circle>
        <path d="M10 4 5.58172 4"></path>
        <circle cy="4" cx="5.58172" r="0.25"></circle>
        <path d="M2 12 2 7.58172"></path>
        <circle cy="7.58172" cx="2" r="0.25"></circle>
        <path d="M2 12 2 15.5841"></path>
        <circle cy="15.5841" cx="2" r="0.25"></circle>
        <path d="M6.06253 21 3.57127 18.8012"></path>
        <circle cy="18.8012" cx="3.57127" r="0.25"></circle>
      </motion.svg>
      <g class="svg-preview-colored-path-group" opacity="0.7">
        <!-- <path d="M 14 12 C14 9.79086 12.2091 8 10 8" stroke="##dfdfd6"></path>
        <path d="M 10 8 C7.79086 8 6 9.79086 6 12" stroke="##dfdfd6"></path>
        <path d="M 6 12 C6 16.4183 9.58172 20 14 20" stroke="##dfdfd6"></path>
        <path d="M 14 20 C18.4183 20 22 16.4183 22 12" stroke="##dfdfd6"></path>
        <path d="M 22 12 C22 8.446 20.455 5.25285 18 3.05557" stroke="##dfdfd6"></path>
        <path d="M 10 12 C10 14.2091 11.7909 16 14 16" stroke="##dfdfd6"></path>
        <path d="M 14 16 C16.2091 16 18 14.2091 18 12" stroke="##dfdfd6"></path>
        <path d="M 18 12 C18 7.58172 14.4183 4 10 4" stroke="##dfdfd6"></path>
        <path d="M 10 4 C5.58172 4 2 7.58172 2 12" stroke="##dfdfd6"></path>
        <path d="M 2 12 C2 15.5841 3.57127 18.8012 6.06253 21" stroke="##dfdfd6"></path> -->
        <motion.path d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557" stroke="#fff" :custom="8" animate="visible" initial="hidden"
                :variants="draw"/>
        <motion.path d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21" stroke="#F56565" :custom="8" animate="visible" initial="hidden"
                :variants="draw" />
      </g>
      <g class="svg-preview-radii-group" stroke-width="0.12" stroke-dasharray="0 0.25 0.25" stroke="#777"
        stroke-opacity="0.3"></g>
      <g class="svg-preview-control-path-marker-mask-group" stroke-width="1" stroke="#000">
        <mask id="svg-preview-control-path-marker-mask-0" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M14 12h.01"></path>
          <path d="M10 8h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-1" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M10 8h.01"></path>
          <path d="M6 12h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-2" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M6 12h.01"></path>
          <path d="M14 20h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-3" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M14 20h.01"></path>
          <path d="M22 12h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-4" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M22 12h.01"></path>
          <path d="M18 3.05557h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-5" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M10 12h.01"></path>
          <path d="M14 16h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-6" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M14 16h.01"></path>
          <path d="M18 12h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-7" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M18 12h.01"></path>
          <path d="M10 4h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-8" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M10 4h.01"></path>
          <path d="M2 12h.01"></path>
        </mask>
        <mask id="svg-preview-control-path-marker-mask-9" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke="none" rx="1"></rect>
          <path d="M2 12h.01"></path>
          <path d="M6.06253 21h.01"></path>
        </mask>
      </g>
      <g class="svg-preview-control-path-group" stroke="#fff" stroke-width="0.125">
        <path mask="url(#svg-preview-control-path-marker-mask-0)" d="M 14 12 C14 9.79086 12.2091 8 10 8"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-1)" d="M 10 8 C7.79086 8 6 9.79086 6 12"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-2)" d="M 6 12 C6 16.4183 9.58172 20 14 20"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-3)" d="M 14 20 C18.4183 20 22 16.4183 22 12"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-4)" d="M 22 12 C22 8.446 20.455 5.25285 18 3.05557">
        </path>
        <path mask="url(#svg-preview-control-path-marker-mask-5)" d="M 10 12 C10 14.2091 11.7909 16 14 16"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-6)" d="M 14 16 C16.2091 16 18 14.2091 18 12"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-7)" d="M 18 12 C18 7.58172 14.4183 4 10 4"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-8)" d="M 10 4 C5.58172 4 2 7.58172 2 12"></path>
        <path mask="url(#svg-preview-control-path-marker-mask-9)" d="M 2 12 C2 15.5841 3.57127 18.8012 6.06253 21">
        </path>
      </g>
      <g class="svg-preview-control-path-marker-group" stroke="#fff" stroke-width="0.125">
        <path
          d="M14 12h.01M10 8h.01M10 8h.01M6 12h.01M6 12h.01M14 20h.01M14 20h.01M22 12h.01M22 12h.01M18 3.05557h.01M10 12h.01M14 16h.01M14 16h.01M18 12h.01M18 12h.01M10 4h.01M10 4h.01M2 12h.01M2 12h.01M6.06253 21h.01">
        </path>
        <circle cx="14" cy="12" r="0.5"></circle>
        <circle cx="18" cy="3.05557" r="0.5"></circle>
        <circle cx="10" cy="12" r="0.5"></circle>
        <circle cx="6.06253" cy="21" r="0.5"></circle>
      </g>
      <g class="svg-preview-handles-group" stroke-width="0.12" stroke="#FFF" stroke-opacity="0.3">
        <path d="M14 12 14 9.79086"></path>
        <circle cy="9.79086" cx="14" r="0.25"></circle>
        <path d="M10 8 12.2091 8"></path>
        <circle cy="8" cx="12.2091" r="0.25"></circle>
        <path d="M10 8 7.79086 8"></path>
        <circle cy="8" cx="7.79086" r="0.25"></circle>
        <path d="M6 12 6 9.79086"></path>
        <circle cy="9.79086" cx="6" r="0.25"></circle>
        <path d="M6 12 6 16.4183"></path>
        <circle cy="16.4183" cx="6" r="0.25"></circle>
        <path d="M14 20 9.58172 20"></path>
        <circle cy="20" cx="9.58172" r="0.25"></circle>
        <path d="M14 20 18.4183 20"></path>
        <circle cy="20" cx="18.4183" r="0.25"></circle>
        <path d="M22 12 22 16.4183"></path>
        <circle cy="16.4183" cx="22" r="0.25"></circle>
        <path d="M22 12 22 8.446"></path>
        <circle cy="8.446" cx="22" r="0.25"></circle>
        <path d="M18 3.05557 20.455 5.25285"></path>
        <circle cy="5.25285" cx="20.455" r="0.25"></circle>
        <path d="M10 12 10 14.2091"></path>
        <circle cy="14.2091" cx="10" r="0.25"></circle>
        <path d="M14 16 11.7909 16"></path>
        <circle cy="16" cx="11.7909" r="0.25"></circle>
        <path d="M14 16 16.2091 16"></path>
        <circle cy="16" cx="16.2091" r="0.25"></circle>
        <path d="M18 12 18 14.2091"></path>
        <circle cy="14.2091" cx="18" r="0.25"></circle>
        <path d="M18 12 18 7.58172"></path>
        <circle cy="7.58172" cx="18" r="0.25"></circle>
        <path d="M10 4 14.4183 4"></path>
        <circle cy="4" cx="14.4183" r="0.25"></circle>
        <path d="M10 4 5.58172 4"></path>
        <circle cy="4" cx="5.58172" r="0.25"></circle>
        <path d="M2 12 2 7.58172"></path>
        <circle cy="7.58172" cx="2" r="0.25"></circle>
        <path d="M2 12 2 15.5841"></path>
        <circle cy="15.5841" cx="2" r="0.25"></circle>
        <path d="M6.06253 21 3.57127 18.8012"></path>
        <circle cy="18.8012" cx="3.57127" r="0.25"></circle>
      </g>
    </motion.svg>
  </div>
</template>

<style scoped>
.hero-background {
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  position: fixed;
  top: -240px;
  right: -480px;
  width: 120vw;
  height: 120vh;
}

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
