<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { motion, type Options as MotionOptions } from 'motion-v';

// motion-v re-exports framer-motion's `Variants`, which doesn't match the `variants` prop of its components
type Variants = MotionOptions['variants'];

/**
 * The logo drawing from the home hero animation, played once and stopped at the coloured logo.
 */

const LOGO_PATHS = [
  'M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557',
  'M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21',
];

const MARKERS = [
  [14, 12],
  [18, 3.05557],
  [10, 12],
  [6.06253, 21],
];

/** Bezier handles as [x1, y1, x2, y2] segments, grouped by when they appear. */
const HANDLE_GROUPS = [
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
  exit: (index) => ({
    stroke: index === 0 ? 'var(--vp-c-text-1)' : 'var(--vp-c-brand)',
    pathLength: 1.02,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  }),
};

const drawAnimation = ref('visible');

// motion-v passes the variant label that finished, not the resolved variant
const onAnimationComplete = (variant: unknown) => {
  if (variant === 'visible') drawAnimation.value = 'exit';
};

// Only rendered on the client, so reduced motion is known before the first frame
const mounted = ref(false);
const reducedMotion = ref(false);

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion.value) drawAnimation.value = 'exit';
  mounted.value = true;
});

/** Skips straight to the end state when the user prefers reduced motion. */
const initial = <T,>(value: T) => (reducedMotion.value ? false : value);
</script>

<template>
  <div
    class="sponsor-hero-animation"
    aria-hidden="true"
  >
    <svg
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
      focusable="false"
    >
      <g
        stroke-linecap="butt"
        stroke-width="0.1"
        stroke="#777"
        stroke-opacity="0.3"
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

      <g stroke-width="2">
        <motion.path
          v-for="(d, index) in LOGO_PATHS"
          :key="d"
          :d="d"
          :style="{ stroke: 'var(--vp-c-gray-1)' }"
          :initial="initial('hidden')"
          :animate="drawAnimation"
          :variants="draw"
          :custom="index"
          @animation-complete="onAnimationComplete"
        />
      </g>

      <g
        :style="{ stroke: 'var(--vp-c-text-1)' }"
        stroke-width="0.125"
      >
        <motion.path
          v-for="d in LOGO_PATHS"
          :key="d"
          :d="d"
          :initial="initial({ opacity: 0 })"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 1.6, duration: 1.5 }"
        />
        <motion.path
          d="M14 12h.01M10 8h.01M6 12h.01M14 20h.01M22 12h.01M18 3.05557h.01M10 12h.01M14 16h.01M18 12h.01M10 4h.01M2 12h.01M6.06253 21h.01"
          :initial="initial({ opacity: 0 })"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.2, duration: 0.3 }"
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
        />
      </g>

      <g
        stroke-width="0.12"
        stroke="#FFF"
        stroke-opacity="0.3"
      >
        <motion.g
          v-for="(group, index) in HANDLE_GROUPS"
          :key="index"
          :initial="initial({ opacity: 0, scale: 0.2 })"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: group.delay, duration: 0.3 }"
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
      </g>
    </svg>
  </div>
</template>

<style scoped>
.sponsor-hero-animation {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  aspect-ratio: 8 / 5;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) rotateX(-51deg) rotateZ(-43deg);
  transform-style: preserve-3d;
  pointer-events: none;
}
</style>
