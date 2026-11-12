<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import { ChromePicker, tinycolor } from 'vue-color';
import 'vue-color/style.css';
import { useEyeDropper } from '@vueuse/core';
import Icon from '@lucide/vue/src/Icon';
import { pipette } from '../../../data/iconNodes';

const props = defineProps<{
  modelValue: string | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

// Icons default to `currentColor`, which is the body text colour. Start from that colour when no
// custom colour is set, without its alpha so the alpha slider starts at 100%.
const defaultColor =
  typeof document === 'undefined' ? '#000000' : getComputedStyle(document.body).color;

function parseColor(value: string | null) {
  const color = tinycolor(value ?? '');

  return color.isValid() ? color : tinycolor(defaultColor).setAlpha(1);
}

function toHex(color: tinycolor.Instance) {
  return color.getAlpha() < 1 ? color.toHex8String() : color.toHexString();
}

/*
 * Keep the picker's own full precision colour, and only emit hex. Feeding the rounded hex value
 * back into the picker would make the hue and saturation knobs jump on low saturated colours.
 */
const color = shallowRef(parseColor(props.modelValue));
let lastEmittedValue: string | null = null;

watch(
  () => props.modelValue,
  (value) => {
    if (value !== lastEmittedValue) {
      color.value = parseColor(value);
    }
  },
);

const tinyColor = computed({
  get: () => color.value,
  set: (newColor: tinycolor.Instance) => {
    color.value = newColor;
    lastEmittedValue = toHex(newColor);
    emit('update:modelValue', lastEmittedValue);
  },
});

// Greys have no hue (it reads as 0), keep the last one so the hue knob doesn't turn red.
const hue = ref(0);
watch(
  color,
  (newColor) => {
    const { h } = newColor.toHsl();

    if (h !== 0 || hue.value === 0) {
      hue.value = h;
    }
  },
  { immediate: true },
);

const knobColors = computed(() => ({
  '--picker-color': color.value.clone().setAlpha(1).toRgbString(),
  '--picker-color-alpha': color.value.toRgbString(),
  '--picker-hue': `hsl(${hue.value} 100% 50%)`,
}));

const { isSupported: isEyeDropperSupported, open: openEyeDropper } = useEyeDropper();

async function pickColorFromScreen() {
  try {
    const result = await openEyeDropper();

    if (result?.sRGBHex) {
      tinyColor.value = tinycolor(result.sRGBHex);
    }
  } catch {
    // The user cancelled picking with Escape
  }
}
</script>

<template>
  <div
    class="color-picker-panel"
    :class="{ 'has-eye-dropper': isEyeDropperSupported }"
    :style="knobColors"
  >
    <ChromePicker
      v-model:tinyColor="tinyColor"
      disable-fields
    />
    <button
      v-if="isEyeDropperSupported"
      type="button"
      class="eye-dropper-button"
      aria-label="Pick a color from the screen"
      @click="pickColorFromScreen"
    >
      <Icon
        :iconNode="pipette"
        name="pipette"
        :size="20"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<style scoped>
.color-picker-panel {
  --knob-size: 20px;
  --bar-height: 12px;
  --eye-dropper-size: 40px;

  position: relative;
  padding: 16px;
}

/* Reset the Chrome picker frame, the panel around it is the card */
.color-picker-panel :deep(.vc-chrome-picker) {
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  font-family: inherit;
}

.color-picker-panel :deep(.body) {
  padding: 16px 0 0;
  background: transparent;
}

/* Saturation and brightness area. Not clipped, so the knob can reach the edges */
.color-picker-panel :deep(.saturation) {
  padding-bottom: 68%;
  overflow: visible;
  border-radius: 10px;
}

.color-picker-panel :deep(.saturation .bg) {
  border-radius: 10px;
}

.color-picker-panel :deep(.saturation .bg.black) {
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
}

/* Eye dropper on the left, hue and alpha sliders on the right */
.color-picker-panel :deep(.controls) {
  gap: 12px;
  align-items: center;
}

.color-picker-panel :deep(.color-wrap) {
  display: none;
}

.color-picker-panel.has-eye-dropper :deep(.controls) {
  min-height: var(--eye-dropper-size);
}

/* Keeps the room for the eye dropper button, which is placed on top of it */
.color-picker-panel.has-eye-dropper :deep(.color-wrap) {
  display: block;
  flex-shrink: 0;
  width: var(--eye-dropper-size);
  height: var(--eye-dropper-size);
  visibility: hidden;
}

.color-picker-panel :deep(.hue-wrap),
.color-picker-panel :deep(.alpha-wrap) {
  height: var(--bar-height);
}

.color-picker-panel :deep(.hue-wrap) {
  margin-bottom: 10px;
}

.color-picker-panel :deep(.vc-base-slider .background),
.color-picker-panel :deep(.vc-base-slider .gradient),
.color-picker-panel :deep(.vc-base-slider .vc-checkerboard) {
  border-radius: calc(var(--bar-height) / 2);
}

.color-picker-panel :deep(.vc-base-slider .slider) {
  outline: none;
}

/* Knobs, the same size and interaction as the customizer slider thumbs (RangeSlider.vue) */
.color-picker-panel :deep(.saturation .picker),
.color-picker-panel :deep(.vc-base-slider .picker) {
  box-sizing: border-box;
  width: var(--knob-size);
  height: var(--knob-size);
  margin: 0;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-2);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.color-picker-panel :deep(.saturation .picker) {
  --knob-translate: translate(-50%, -50%);
  background: var(--picker-color);
  transform: var(--knob-translate);
}

.color-picker-panel :deep(.vc-base-slider .picker) {
  --knob-translate: translate(-50%, calc((var(--bar-height) - var(--knob-size)) / 2));
  transform: var(--knob-translate);
}

.color-picker-panel :deep(.hue-wrap .picker) {
  background: var(--picker-hue);
}

.color-picker-panel :deep(.alpha-wrap .picker) {
  background: var(--picker-color-alpha);
}

.color-picker-panel :deep(.saturation .picker-wrap:hover .picker),
.color-picker-panel :deep(.saturation .picker-wrap:focus-visible .picker),
.color-picker-panel :deep(.vc-base-slider .slider:hover .picker),
.color-picker-panel :deep(.vc-base-slider .slider:focus-visible .picker) {
  transform: var(--knob-translate) scale(1.1);
  box-shadow:
    var(--vp-shadow-2),
    0 0 0 5px color-mix(in srgb, var(--vp-c-brand) 25%, transparent);
}

.color-picker-panel :deep(.saturation .vc-saturation-slider:active .picker),
.color-picker-panel :deep(.vc-base-slider .slider:active .picker) {
  transform: var(--knob-translate) scale(1.2);
  box-shadow:
    var(--vp-shadow-2),
    0 0 0 7px color-mix(in srgb, var(--vp-c-brand) 25%, transparent);
}

.eye-dropper-button {
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--eye-dropper-size);
  height: var(--eye-dropper-size);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    color 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.eye-dropper-button:hover,
.eye-dropper-button:focus-visible {
  outline: none;
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
}
</style>
