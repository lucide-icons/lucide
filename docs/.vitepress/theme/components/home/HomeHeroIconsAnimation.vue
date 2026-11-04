<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { data } from './HomeHeroIconsCard.data';
import { useRouter } from 'vitepress';
import { motion, useScroll, useTransform, type Options as MotionOptions } from 'motion-v';
import { useMediaQuery } from '@vueuse/core';
import LucideIcon from '../base/LucideIcon.vue';

// motion-v re-exports framer-motion's `Variants`, which doesn't match the `variants` prop of its components
type Variants = MotionOptions['variants'];

const emit = defineEmits(['animation-complete']);

const MotionLucideIcon = motion.create(LucideIcon);

const preventFocusProps = {
  tabindex: '-1',
  focusable: 'false',
};

const COLUMNS = 8;
const SIZE = 2;
const GAP = 1;

/** The two spirals of the Lucide logo, drawn the way the SVG editor previews them. */
const LOGO_PATH_OUTER =
  'M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557';

const LOGO_PATH_INNER =
  'M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21';

const VERTICES =
  'M14 12h.01M10 8h.01M6 12h.01M14 20h.01M22 12h.01M18 3.05557h.01M10 12h.01M14 16h.01M18 12h.01M10 4h.01M2 12h.01M6.06253 21h.01';

const MARKERS = [
  [14, 12],
  [18, 3.05557],
  [10, 12],
  [6.06253, 21],
];

/** Bezier handles as [x1, y1, x2, y2] segments, grouped by when they appear. */
const HANDLE_GROUPS = [
  // Outer spiral
  { delay: 0.2, segments: [[14, 12, 14, 9.79086]] },
  {
    delay: 0.4,
    segments: [
      [10, 8, 12.2091, 8],
      [10, 8, 7.79086, 8],
    ],
  },
  {
    delay: 0.6,
    segments: [
      [6, 12, 6, 9.79086],
      [6, 12, 6, 16.4183],
    ],
  },
  {
    delay: 0.8,
    segments: [
      [14, 20, 9.58172, 20],
      [14, 20, 18.4183, 20],
    ],
  },
  {
    delay: 1,
    segments: [
      [22, 12, 22, 16.4183],
      [22, 12, 22, 8.446],
    ],
  },
  { delay: 1.2, segments: [[18, 3.05557, 20.455, 5.25285]] },
  // Inner spiral
  { delay: 0.2, segments: [[10, 12, 10, 14.2091]] },
  {
    delay: 0.4,
    segments: [
      [14, 16, 11.7909, 16],
      [14, 16, 16.2091, 16],
    ],
  },
  {
    delay: 0.6,
    segments: [
      [18, 12, 18, 14.2091],
      [18, 12, 18, 7.58172],
    ],
  },
  {
    delay: 0.8,
    segments: [
      [10, 4, 14.4183, 4],
      [10, 4, 5.58172, 4],
    ],
  },
  {
    delay: 1,
    segments: [
      [2, 12, 2, 7.58172],
      [2, 12, 2, 15.5841],
    ],
  },
  { delay: 1.2, segments: [[6.06253, 21, 3.57127, 18.8012]] },
];

const { scrollYProgress } = useScroll();
const opacity = useTransform(() => 1 - scrollYProgress.get() * 8);

const icons = ref(
  data.icons.slice(0, 64).map((icon, index) => {
    const x = index % COLUMNS;
    const y = Math.floor(index / COLUMNS);

    if (index === 0) {
      return {
        ...icon,
        x: 9999,
        y: 9999,
        opacity: 0,
      };
    }

    return {
      ...icon,
      x: x * (SIZE + GAP) + 0.5,
      y: y * (SIZE + GAP) + 0.5,
    };
  }),
);

const { go } = useRouter();
const intervalTime = shallowRef();
const showHandles = ref(true);
const scaleDownVariants: Variants = {
  fullSize: {
    scale: 1,
  },
  riseUp: {
    x: 0.5,
    y: -0.5,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  small: {
    x: -10.5,
    y: -10.5,
    scale: 0.1,
    transition: {
      delay: 1,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const scaleDownAnimation = ref('fullSize');

const iconGridAnimation = ref('initial');

const drawAnimation = ref('visible');
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1.02,
    opacity: 1,
    transition: {
      pathLength: { delay: 2.4, type: 'spring', duration: 2.8, bounce: 0 },
      opacity: { delay: 2.4, duration: 0.1 },
    },
  },
  exit: (path) => ({
    stroke: path ? 'var(--vp-c-text-1)' : 'var(--vp-c-brand)',
    pathLength: 1.02,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  }),
};

// motion-v passes the variant label that finished, not the resolved variant
const onAnimationComplete = (variant: unknown) => {
  // Reduced motion stops at the icon grid, so don't shrink the icons or loop
  if (reducedMotion.value) return;

  if (variant === 'visible') {
    drawAnimation.value = 'exit';
    return;
  }
  if (variant === 'exit') {
    showHandles.value = false;
    scaleDownAnimation.value = 'small';
  }
  if (variant === 'small') {
    iconGridAnimation.value = 'showIcons';
  }
  if (variant === 'riseUp') {
    scaleDownAnimation.value = 'small';
  }
  if (variant === 'showIcons') {
    shrinkIconAnimation.value = 'shrinkIcons';
  }
  if (variant === 'shrinkIcons') {
    iconGridAnimation.value = 'initial';

    setTimeout(() => {
      emit('animation-complete');
    }, 2800);
  }
};

const randomIndex = ref(Math.floor(Math.random() * 64));

const iconAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    x: 0,
    y: 0,
    transition: { duration: 1, delay: 1, ease: 'easeInOut' },
  },
  showIcons: (index) => ({
    opacity: [0, 1, 1],
    x: [0.5, 0, 0],
    y: [-0.5, 0, 0],
    strokeWidth: randomIndex.value === index ? [0, 2, 2] : undefined,
    transition: { delay: index * 0.023, duration: 1.6, ease: 'easeInOut' },
  }),
};

const shrinkIconAnimation = ref('initial');

const shrinkIconVariants: Variants = {
  initial: { strokeWidth: 2 },
  shrinkIcons: (index) => ({
    opacity: 1,
    strokeWidth: 0,
    transition: { delay: 1.8, duration: 1.5, ease: 'easeInOut' },
  }),
};

// Only rendered on the client, so reduced motion is known before the first frame
const mounted = ref(false);
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

onMounted(() => {
  if (reducedMotion.value) {
    drawAnimation.value = 'exit';
    showHandles.value = false;
    scaleDownAnimation.value = 'small';
    iconGridAnimation.value = 'showIcons';
  }

  mounted.value = true;
});

/** Skips straight to the end state when the user prefers reduced motion. */
const initial = <T,>(value: T) => (reducedMotion.value ? false : value);
</script>

<template>
  <div
    class="home-hero-animation-container"
    v-bind="preventFocusProps"
  >
    <div
      class="home-hero-animation"
      v-bind="preventFocusProps"
    >
      <motion.svg
        v-if="mounted"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-12 -12 48 48"
        fill="none"
        overflow="auto"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="hero-background"
        :style="{ opacity }"
        v-bind="preventFocusProps"
      >
        <g
          class="svg-preview-grid-group"
          stroke-linecap="butt"
          stroke-width="0.1"
          stroke="#777"
          mask="url(#svg-preview-bounding-box-mask)"
          stroke-opacity="0.3"
          v-bind="preventFocusProps"
        >
          <path
            stroke-dasharray="0 0.1 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0.1 0.15 0 0.15"
            stroke-width="0.1"
            d="M1 0.1v23.8M2 0.1v23.8M4 0.1v23.8M5 0.1v23.8M7 0.1v23.8M8 0.1v23.8M10 0.1v23.8M11 0.1v23.8M13 0.1v23.8M14 0.1v23.8M16 0.1v23.8M17 0.1v23.8M19 0.1v23.8M20 0.1v23.8M22 0.1v23.8M23 0.1v23.8M0.1 1h23.8M0.1 2h23.8M0.1 4h23.8M0.1 5h23.8M0.1 7h23.8M0.1 8h23.8M0.1 10h23.8M0.1 11h23.8M0.1 13h23.8M0.1 14h23.8M0.1 16h23.8M0.1 17h23.8M0.1 19h23.8M0.1 20h23.8M0.1 22h23.8M0.1 23h23.8"
          />

          <path
            d="M3 0.1v23.8M6 0.1v23.8M9 0.1v23.8M12 0.1v23.8M15 0.1v23.8M18 0.1v23.8M21 0.1v23.8M0.1 3h23.8M0.1 6h23.8M0.1 9h23.8M0.1 12h23.8M0.1 15h23.8M0.1 18h23.8M0.1 21h23.8"
          />
        </g>

        <motion.g
          initial="initial"
          :variants="shrinkIconVariants"
          :animate="shrinkIconAnimation"
          @animation-complete="onAnimationComplete"
          v-bind="preventFocusProps"
        >
          <MotionLucideIcon
            v-for="(icon, index) in icons"
            size="2"
            :initial="initial('initial')"
            :key="icon.name"
            :variants="iconAnimationVariants"
            :animate="iconGridAnimation"
            :custom="index"
            strokeWidth="inherit"
            v-bind="icon"
            @animation-complete="onAnimationComplete"
            tabindex="-1"
            focusable="false"
          />
          <motion.g
            :variants="scaleDownVariants"
            :animate="scaleDownAnimation"
            :initial="initial('hidden')"
            @animation-complete="onAnimationComplete"
            v-bind="preventFocusProps"
          >
            <motion.path
              :d="LOGO_PATH_OUTER"
              :style="{ stroke: reducedMotion ? 'var(--vp-c-text-1)' : 'var(--vp-c-gray-1)' }"
              :animate="drawAnimation"
              :initial="initial('hidden')"
              :variants="draw"
              :custom="1"
              @animation-complete="onAnimationComplete"
              v-bind="preventFocusProps"
            />

            <motion.path
              :d="LOGO_PATH_INNER"
              :style="{ stroke: reducedMotion ? 'var(--vp-c-brand)' : 'var(--vp-c-gray-1)' }"
              :animate="drawAnimation"
              :initial="initial('hidden')"
              :variants="draw"
              :custom="0"
              v-bind="preventFocusProps"
            />
          </motion.g>
        </motion.g>
        <motion.g
          class="svg-preview-control-path-marker-group"
          :style="{ stroke: 'var(--vp-c-text-1)' }"
          stroke-width="0.125"
          :initial="initial({ opacity: 1 })"
          :animate="{ opacity: showHandles ? 1 : 0 }"
          :transition="{ duration: 0.2 }"
          v-bind="preventFocusProps"
        >
          <motion.path
            v-for="d in [LOGO_PATH_OUTER, LOGO_PATH_INNER]"
            :key="d"
            :d="d"
            :initial="initial({ opacity: 0 })"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 1.6, duration: 1.5 }"
            v-bind="preventFocusProps"
          />
          <motion.path
            :d="VERTICES"
            :initial="initial({ opacity: 0 })"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.2, duration: 0.3 }"
            v-bind="preventFocusProps"
          />
          <motion.circle
            v-for="[cx, cy] in MARKERS"
            :key="`${cx},${cy}`"
            :cx="cx"
            :cy="cy"
            r="0.5"
            :initial="initial({ opacity: 0, scale: 0.2 })"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8 }"
            v-bind="preventFocusProps"
          />
        </motion.g>
        <motion.g
          class="svg-preview-handles-group"
          stroke-width="0.12"
          stroke="#FFF"
          stroke-opacity="0.3"
          :initial="initial({ opacity: 1 })"
          :animate="{ opacity: showHandles ? 1 : 0 }"
          :transition="{ duration: 0.6 }"
          v-bind="preventFocusProps"
        >
          <motion.g
            v-for="(group, index) in HANDLE_GROUPS"
            :key="index"
            :initial="initial({ opacity: 0, scale: 0.2 })"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: group.delay, duration: 0.3 }"
            v-bind="preventFocusProps"
          >
            <template
              v-for="[x1, y1, x2, y2] in group.segments"
              :key="`${x2},${y2}`"
            >
              <path :d="`M${x1} ${y1} ${x2} ${y2}`" />
              <circle
                :cx="x2"
                :cy="y2"
                r="0.25"
              />
            </template>
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  </div>
</template>

<style scoped>
.home-hero-animation-container {
  margin: -48px -24px 0;
  display: flex;
}

.home-hero-animation {
  height: 250px;
  width: 396px;
  overflow: hidden;
  margin: auto;
  margin-left: calc(((396px - 100vw) / 2) * -1);
}

@media (min-width: 396px) {
  .home-hero-animation {
    margin-left: auto;
  }
}

.hero-background {
  transform: rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  will-change: transform, opacity;
  position: relative;
  top: -155px;
  left: -82px;
  width: 560px;
  height: 560px;
  pointer-events: none;
}

@media (min-width: 640px) {
  .hero-background {
    width: 680px;
    height: 680px;

    left: -100px;
    top: -188px;
  }

  .home-hero-animation {
    height: 305px;
    width: 480px;
  }
}

@media (min-width: 768px) {
  .hero-background {
    width: 760px;
    height: 760px;

    left: -110px;
    top: -200px;
  }

  .home-hero-animation {
    height: 360px;
    width: 540px;
  }

  .home-hero-animation-container {
    margin-top: -60px;
  }
}

@media (min-width: 960px) {
  .hero-background {
    top: -20vw;
    right: 20vw;
    width: 80vw;
    height: 80vw;
  }

  .home-hero-animation {
    height: 415px;
    width: 620px;
  }

  .home-hero-animation-container {
    margin: -48px -48px 0 -64px;
  }
}

@media (min-width: 1160px) {
  .home-hero-animation-container {
    margin-right: -64px;
    margin-bottom: -180px;
  }

  .home-hero-animation {
    width: auto;
    height: calc(((1152px / 2)));
    top: -20px;
  }

  .hero-background {
    top: -20vw;
  }
}

@media (min-width: 1280px) {
  .home-hero-animation-container {
    margin-right: -420px;
    margin-top: -64px;
    /* margin-right: calc(((((100vw - 1152px) / 2)) * -1) + 24px); */
    margin-left: -128px;
  }

  .hero-background {
    width: 1024px;
    height: 1024px;
    top: -280px;
  }
}
</style>
