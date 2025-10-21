<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount, watchEffect, computed} from 'vue';
import { data } from './HomeHeroIconsCard.data'
import { useRouter } from 'vitepress';
import { random } from 'lodash-es'
import FakeInput from '../base/FakeInput.vue'
// import { useScroll } from '@vueuse/core';
import { motion, Variants, useScroll, useSpring, useTransform } from "motion-v"
import LucideIcon from '../base/LucideIcon.vue'
import { shrink } from '~/.vitepress/data/iconNodes';

const emit = defineEmits(['animation-complete'])

const MotionLucideIcon = motion.create(LucideIcon)

const COLUMNS = 8;
const SIZE = 2;
const GAP = 1;

const { scrollYProgress } = useScroll()
const opacity = useTransform(() => (1 - scrollYProgress.get() * 8))

const icons = ref(data.icons.slice(0, 64).map((icon, index) => {
  const x = index % COLUMNS;
  const y = Math.floor(index / COLUMNS);

  if (index === 0) {
    return {
      ...icon,
      x: 9999,
      y: 9999,
      opacity: 0
    }
  }

  return {
    ...icon,
    x: x * (SIZE + GAP) + 0.5,
    y: y * (SIZE + GAP) + 0.5
  }
}))

const { go } = useRouter()
const intervalTime = shallowRef()
const showHandles = ref(true)
const scaleDownVariants: Variants = {
  fullSize: {
    scale: 1
  },
  riseUp: {
    x: 0.5,
    y: -0.5,
    animationName: 'riseUp',
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  small: {
    x: -10.5,
    y: -10.5,
    scale: 0.1,
    animationName: 'small',
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}
const scaleDownAnimation = ref('fullSize')

const iconGridAnimation = ref('initial')

const drawAnimation = ref('visible')
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible:  {
    animationName: 'visible',
    pathLength: 1,
    opacity: 1,
    transition: {
        pathLength: { delay: 2.4, type: "spring", duration: 2.8, bounce: 0 },
        opacity: { delay: 2.4, duration: 0.1 },
    },
  },
  exit: {
    animationName: 'exit',
    stroke: 'var(--vp-c-text-1)',
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const onAnimationComplete = (item) => {
  if (item.animationName === 'visible') {
    drawAnimation.value = 'exit'
    return
  }
  if (item.animationName === 'exit') {
    showHandles.value = false
    scaleDownAnimation.value = 'small'
  }
  if (item.animationName === 'small') {
    iconGridAnimation.value = 'showIcons'
  }
  if (item.animationName === 'riseUp') {
    scaleDownAnimation.value = 'small'
  }
  if (item.animationName === 'showIcons') {
    shrinkIconAnimation.value = 'shrinkIcons'
  }
  if (item.animationName === 'shrinkIcons') {
    iconGridAnimation.value = 'initial'

    setTimeout(() => {
      emit('animation-complete')
    }, 2000)
  }
}

const randomIndex = ref(Math.floor(Math.random() * 64))

const iconAnimationVariants = {
  initial: {
    animationName: 'end',
    opacity: 0,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: 'easeInOut' }
  },
  showIcons: (index) => ({
    animationName: 'showIcons',
    opacity: [0, 1, 1],
    x: [0.5, 0, 0],
    y: [-0.5, 0, 0],
    strokeWidth: randomIndex.value === index ? [0, 2, 2] : undefined,
    transition: { delay: index * 0.023, duration: 1.5, ease: 'easeInOut' }
  }),
}

const shrinkIconAnimation = ref('initial')

const shrinkIconVariants = {
  initial: { strokeWidth: 2 },
  shrinkIcons: (index) => ({
    animationName: 'shrinkIcons',
    opacity: 1,
    strokeWidth: 0,
    transition: { delay: 0.5, duration: 1.5, ease: 'easeInOut' }
  })
}

</script>

<template>
  <div>
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 48 48" fill="none" overflow="auto"
      stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="hero-background"
      :style="{ opacity }">

      <g class="svg-preview-grid-group" stroke-linecap="butt" stroke-width="0.1" stroke="#777"
        mask="url(#svg-preview-bounding-box-mask)" stroke-opacity="0.3">
        <path
          stroke-dasharray="0 0.1 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0 0.15"
          stroke-width="0.1"
          d="M1 0.1v23.8M2 0.1v23.8M4 0.1v23.8M5 0.1v23.8M7 0.1v23.8M8 0.1v23.8M10 0.1v23.8M11 0.1v23.8M13 0.1v23.8M14 0.1v23.8M16 0.1v23.8M17 0.1v23.8M19 0.1v23.8M20 0.1v23.8M22 0.1v23.8M23 0.1v23.8M0.1 1h23.8M0.1 2h23.8M0.1 4h23.8M0.1 5h23.8M0.1 7h23.8M0.1 8h23.8M0.1 10h23.8M0.1 11h23.8M0.1 13h23.8M0.1 14h23.8M0.1 16h23.8M0.1 17h23.8M0.1 19h23.8M0.1 20h23.8M0.1 22h23.8M0.1 23h23.8">
        </path>
        <path
          d="M3 0.1v23.8M6 0.1v23.8M9 0.1v23.8M12 0.1v23.8M15 0.1v23.8M18 0.1v23.8M21 0.1v23.8M0.1 3h23.8M0.1 6h23.8M0.1 9h23.8M0.1 12h23.8M0.1 15h23.8M0.1 18h23.8M0.1 21h23.8">
        </path>
      </g>
      <motion.g
        initial="initial"
        :variants="shrinkIconVariants"
        :animate="shrinkIconAnimation"
        @animation-complete="onAnimationComplete"
      >
        <MotionLucideIcon
          v-for="(icon, index) in icons"
          size="2"
          class="animated-icon"
          initial="initial"
          :key="icon.name"
          :variants="iconAnimationVariants"
          :animate="iconGridAnimation"
          :custom="index"
          strokeWidth="inherit"
          v-bind="icon"
          @animation-complete="onAnimationComplete"
        />
        <motion.g
          class="svg-preview-colored-path-group"
          :variants="scaleDownVariants"
          :animate="scaleDownAnimation"
          initial="hidden"
          @animation-complete="onAnimationComplete"
        >
          <motion.path
            d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557"
            :style="{ stroke: 'var(--vp-c-gray-1)'}"
            :animate="drawAnimation"
            initial="hidden"
            :variants="draw"
            @animation-complete="onAnimationComplete"
          />
          <motion.path d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21"
            :style="{ stroke: 'var(--vp-c-gray-1)'}"
            :animate="drawAnimation"
            initial="hidden"
            :variants="draw"
          />
        </motion.g>
      </motion.g>
      <motion.g
        class="svg-preview-control-path-marker-group"
        stroke="#fff"
        stroke-width="0.125"
        :initial="{ opacity: 1 }"
        :animate="showHandles ? { opacity: 1 } : { opacity: 0 }"
        :transition="{ delay: 0, duration: 0.2 }"
      >
        <motion.path d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557"   :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ delay: 1.6, duration: 1.5 }"/>
        <motion.path d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21"  :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ delay: 1.6, duration: 1.5 }" />
        <motion.g :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ delay: 0.2, duration: 0.3 }">
        <path
          d="M14 12h.01M10 8h.01M10 8h.01M6 12h.01M6 12h.01M14 20h.01M14 20h.01M22 12h.01M22 12h.01M18 3.05557h.01M10 12h.01M14 16h.01M14 16h.01M18 12h.01M18 12h.01M10 4h.01M10 4h.01M2 12h.01M2 12h.01M6.06253 21h.01">
        </path>
        </motion.g>

        <motion.circle
          :initial="{ opacity: 0, scale: 0.2 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: 0, duration: 0.8 }"
          cx="14" cy="12" r="0.5"
        />
        <motion.circle
        :initial="{ opacity: 0, scale: 0.2 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0, duration: 0.8 }"cx="14" cy="12" r="0.5"/>
        <motion.circle
        :initial="{ opacity: 0, scale: 0.2 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0, duration: 0.8 }"cx="18" cy="3.05557" r="0.5"/>
        <motion.circle
        :initial="{ opacity: 0, scale: 0.2 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0, duration: 0.8 }"cx="10" cy="12" r="0.5"/>
        <motion.circle
        :initial="{ opacity: 0, scale: 0.2 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0, duration: 0.8 }" cx="6.06253" cy="21" r="0.5"/>
      </motion.g>
      <motion.g
        class="svg-preview-handles-group"
        stroke-width="0.12"
        stroke="#FFF"
        stroke-opacity="0.3"
        :initial="{ opacity: 1 }"
        :animate="showHandles ? { opacity: 1 } : { opacity: 0 }"
        :transition="{ delay: 0, duration: 0.6 }"
      >
        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.2, duration: 0.3 }">
          <path d="M14 12 14 9.79086"></path>
          <circle cy="9.79086" cx="14" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.4, duration: 0.3 }">
          <path d="M10 8 12.2091 8"></path>
          <circle cy="8" cx="12.2091" r="0.25"></circle>
          <path d="M10 8 7.79086 8"></path>
          <circle cy="8" cx="7.79086" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.6, duration: 0.3 }">
        <path d="M6 12 6 9.79086"></path>
        <circle cy="9.79086" cx="6" r="0.25"></circle>
        <path d="M6 12 6 16.4183"></path>
        <circle cy="16.4183" cx="6" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.8, duration: 0.3 }">
        <path d="M14 20 9.58172 20"></path>
        <circle cy="20" cx="9.58172" r="0.25"></circle>
        <path d="M14 20 18.4183 20"></path>
        <circle cy="20" cx="18.4183" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 1, duration: 0.3 }">
        <path d="M22 12 22 16.4183"></path>
        <circle cy="16.4183" cx="22" r="0.25"></circle>
        <path d="M22 12 22 8.446"></path>
        <circle cy="8.446" cx="22" r="0.25"></circle>
        </motion.g>
        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 1.2, duration: 0.3 }">
        <path d="M18 3.05557 20.455 5.25285"></path>
        <circle cy="5.25285" cx="20.455" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.2, duration: 0.3 }">
         <path d="M10 12 10 14.2091"></path>
        <circle cy="14.2091" cx="10" r="0.25"></circle>
        </motion.g>
        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.4, duration: 0.3 }">
        <path d="M14 16 11.7909 16"></path>
        <circle cy="16" cx="11.7909" r="0.25"></circle>
        <path d="M14 16 16.2091 16"></path>
        <circle cy="16" cx="16.2091" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.6, duration: 0.3 }">
          <path d="M18 12 18 14.2091"></path>
          <circle cy="14.2091" cx="18" r="0.25"></circle>
          <path d="M18 12 18 7.58172"></path>
          <circle cy="7.58172" cx="18" r="0.25"></circle>
        </motion.g>

        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 0.8, duration: 0.3 }">
          <path d="M10 4 14.4183 4"></path>
          <circle cy="4" cx="14.4183" r="0.25"></circle>
          <path d="M10 4 5.58172 4"></path>
          <circle cy="4" cx="5.58172" r="0.25"></circle>
        </motion.g>
        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 1, duration: 0.3 }">
        <path d="M2 12 2 7.58172"></path>
        <circle cy="7.58172" cx="2" r="0.25"></circle>
        <path d="M2 12 2 15.5841"></path>
        <circle cy="15.5841" cx="2" r="0.25"></circle>
        </motion.g>
        <motion.g :initial="{ opacity: 0, scale: 0.2 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ delay: 1.2, duration: 0.3 }">
        <path d="M6.06253 21 3.57127 18.8012"></path>
        <circle cy="18.8012" cx="3.57127" r="0.25"></circle>
        </motion.g>
      </motion.g>
    </motion.svg>
  </div>
</template>

<style scoped>
.hero-background {
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  will-change: transform, opacity;
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

.animated-icon {
  will-change: transform, opacity;
}
</style>
