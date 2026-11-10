<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { animate, useInView, useReducedMotion } from 'motion-v';

/**
 * Springs a number up from 0 once it scrolls into view.
 * Ported from motion-counter by Tanja Gomilar (MIT): https://github.com/tgomilar/motion-components
 */
const props = withDefaults(
  defineProps<{
    value: number;
    suffix?: string;
    /** Spring duration, in seconds. */
    duration?: number;
    /** Delay before counting starts, in seconds. */
    delay?: number;
  }>(),
  {
    suffix: '',
    duration: 1.5,
    delay: 0,
  },
);

const el = ref<HTMLElement>();
const inView = useInView(el, { once: true, amount: 0.2 });
const reducedMotion = useReducedMotion();
const current = ref(0);

const format = (value: number) => `${Math.round(value).toLocaleString('en-US')}${props.suffix}`;
const finalText = computed(() => format(props.value));

let controls: ReturnType<typeof animate> | undefined;

watch(inView, (isInView) => {
  if (!isInView) return;

  if (reducedMotion.value) {
    current.value = props.value;
    return;
  }

  controls = animate(0, props.value, {
    type: 'spring',
    duration: props.duration,
    delay: props.delay,
    bounce: 0.05,
    onUpdate: (latest) => {
      current.value = latest;
    },
  });
});

onBeforeUnmount(() => controls?.stop());
</script>

<template>
  <span
    ref="el"
    class="motion-counter"
  >
    <span class="visually-hidden">{{ finalText }}</span>
    <span aria-hidden="true">{{ format(current) }}</span>
  </span>
</template>

<style scoped>
.motion-counter {
  font-variant-numeric: tabular-nums;
}
</style>
