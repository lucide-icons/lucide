<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { motion, type Options as MotionOptions } from 'motion-v';

// motion-v re-exports framer-motion's `Variants`, which doesn't match the `variants` prop of its components
type Variants = MotionOptions['variants'];

/**
 * Draws the heart icon the way the SVG editor previews it (handles and arc radii),
 * played once and stopped at the red heart.
 */

const HEART_PATH =
  'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5';

const VERTICES =
  'M2 9.5h.01M11.591 5.824h.01M12.409 5.824h.01M22 9.5h.01M19 15h.01M13.508 20.313h.01M10.508 20.332h.01M5 15h.01';

const MARKERS = [[2, 9.5]];

/** Bezier handles as [x1, y1, x2, y2] segments, grouped by when they appear. */
const HANDLE_GROUPS = [
  { delay: 0.2, segments: [[22, 9.5, 22, 11.79]] },
  { delay: 0.4, segments: [[19, 15, 20.5, 13.5]] },
  { delay: 0.6, segments: [[5, 15, 3.5, 13.5]] },
  { delay: 0.8, segments: [[2, 9.5, 2, 11.8]] },
];

/** Arc radius guides: the arc's centre and radius, drawn from one arc end to the centre to the other. */
const ARC_GUIDES = [
  { cx: 7.5, cy: 9.5, r: 5.5, from: [2, 9.5], to: [11.591, 5.824], delay: 0.3 },
  { cx: 12, cy: 5.4415, r: 0.56, from: [11.591, 5.824], to: [12.409, 5.824], delay: 0.5 },
  { cx: 16.5101, cy: 9.4738, r: 5.49, from: [12.409, 5.824], to: [22, 9.5], delay: 0.7 },
  { cx: 11.9996, cy: 18.9997, r: 2, from: [13.508, 20.313], to: [10.508, 20.332], delay: 0.9 },
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
  exit: {
    stroke: 'var(--vp-c-brand)',
    pathLength: 1.02,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const drawAnimation = ref('visible');
const showHandles = ref(true);

// motion-v passes the variant label that finished, not the resolved variant
const onAnimationComplete = (variant: unknown) => {
  if (variant === 'visible') drawAnimation.value = 'exit';
};

// Only rendered on the client, so reduced motion is known before the first frame
const mounted = ref(false);
const reducedMotion = ref(false);

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion.value) {
    drawAnimation.value = 'exit';
    showHandles.value = false;
  }
  mounted.value = true;
});

/** Skips straight to the end state when the user prefers reduced motion. */
const initial = <T,>(value: T) => (reducedMotion.value ? false : value);
</script>

<template>
  <div
    class="home-hero-animation-container"
  >
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

      <motion.g
        stroke-width="0.12"
        stroke-dasharray="0 0.25 0.25"
        stroke="#777"
        stroke-opacity="0.3"
        :initial="initial({ opacity: 1 })"
        :animate="{ opacity: showHandles ? 1 : 0 }"
        :transition="{ duration: 0.6 }"
      >
        <motion.g
          v-for="arc in ARC_GUIDES"
          :key="`${arc.cx},${arc.cy}`"
          :initial="initial({ opacity: 0, scale: 0.2 })"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: arc.delay, duration: 0.3 }"
        >
          <path :d="`M${arc.from.join(' ')}L${arc.cx} ${arc.cy}L${arc.to.join(' ')}`" />
          <circle
            :cx="arc.cx"
            :cy="arc.cy"
            r="0.25"
            stroke-dasharray="0"
            stroke="red"
          />
          <circle
            :cx="arc.cx"
            :cy="arc.cy"
            :r="arc.r"
            stroke="red"
          />
        </motion.g>
      </motion.g>

      <motion.path
        :d="HEART_PATH"
        stroke-width="2"
        :style="{ stroke: 'var(--vp-c-gray-1)' }"
        :initial="initial('hidden')"
        :animate="drawAnimation"
        :variants="draw"
        @animation-complete="onAnimationComplete"
      />

      <motion.g
        :style="{ stroke: 'var(--vp-c-text-1)' }"
        stroke-width="0.125"
        :initial="initial({ opacity: 1 })"
        :animate="{ opacity: showHandles ? 1 : 0 }"
        :transition="{ duration: 0.2 }"
      >
        <motion.path
          :d="HEART_PATH"
          :initial="initial({ opacity: 0 })"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 1.6, duration: 1.5 }"
        />
        <motion.path
          :d="VERTICES"
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
      </motion.g>

      <motion.g
        stroke-width="0.12"
        stroke="#FFF"
        stroke-opacity="0.3"
        :initial="initial({ opacity: 1 })"
        :animate="{ opacity: showHandles ? 1 : 0 }"
        :transition="{ duration: 0.6 }"
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
      </motion.g>
    </svg>
  </div>
</div>
</template>

<style scoped>
.sponsor-hero-animation-container {
  margin: -48px -24px 0;
  display: flex;
}
.sponsor-hero-animation {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  aspect-ratio: 8 / 5;
  overflow: hidden;
}

@media (min-width: 960px) {
  .sponsor-hero-animation {
    max-width: 860px;
  }
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
