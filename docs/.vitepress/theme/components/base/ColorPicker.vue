<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import Icon from '@lucide/vue/src/Icon';
import { check, chevronDown, pipette } from '~/.vitepress/data/iconNodes';

const props = defineProps<{
  modelValue: string;
  id: string;
}>();

const emit = defineEmits(['update:modelValue']);

function limitHexInput(val: string) {
  if (val.startsWith('#')) {
    return val.slice(0, 9);
  }

  return val.slice(0, 8);
}

const value = computed({
  get: () => {
    if (props.modelValue == null || props.modelValue === 'currentColor') {
      return null;
    }

    return props.modelValue;
  },
  set: (val) => emit('update:modelValue', limitHexInput(val)),
});

// The picker works in HSV: the square picks saturation (x) and brightness (y), the bar picks the hue
const hue = ref(0);
const saturation = ref(0);
const brightness = ref(0);

function hexToRgb(hex: string) {
  const match = /^#?([\da-f]{3}|[\da-f]{6})(?:[\da-f]{2})?$/i.exec(hex.trim());
  if (!match) return null;

  const digits = match[1].length === 3 ? [...match[1]].map((d) => d + d).join('') : match[1];
  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16));
}

function rgbToHex([r, g, b]: number[]) {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
}

function rgbToHsv([r, g, b]: number[]) {
  [r, g, b] = [r / 255, g / 255, b / 255];
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  let h = 0;
  if (delta) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }

  return { h: (h * 60 + 360) % 360, s: max ? delta / max : 0, v: max };
}

function hsvToRgb(h: number, s: number, v: number) {
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;
    return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255;
  };

  return [channel(5), channel(3), channel(1)];
}

function rgbToHsl([r, g, b]: number[]) {
  const { h, v } = rgbToHsv([r, g, b]);
  const max = v;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));

  return [h, s * 100, l * 100];
}

function hslToRgb([h, s, l]: number[]) {
  [s, l] = [s / 100, l / 100];
  const v = l + s * Math.min(l, 1 - l);

  return hsvToRgb(h, v ? 2 * (1 - l / v) : 0, v);
}

const pickedRgb = computed(() => hsvToRgb(hue.value, saturation.value, brightness.value));
const pickedColor = computed(() => rgbToHex(pickedRgb.value));

watch(
  () => props.modelValue,
  (color) => {
    // Typing a colour moves the picker, but the picker's own colour must not reset the hue of greys
    if (!color || color.toLowerCase() === pickedColor.value) return;

    const rgb = hexToRgb(color);
    if (rgb) setFromRgb(rgb, false);
  },
  { immediate: true },
);

function pick(h: number, s: number, v: number) {
  hue.value = h;
  saturation.value = s;
  brightness.value = v;
  emit('update:modelValue', pickedColor.value);
}

function setFromRgb(rgb: number[], update = true) {
  const { h, s, v } = rgbToHsv(rgb);
  hue.value = s ? h : hue.value;
  saturation.value = s;
  brightness.value = v;
  if (update) emit('update:modelValue', pickedColor.value);
}

const clamp = (n: number, max = 1) => Math.min(max, Math.max(0, n));

// Dragging on the square or the hue bar follows the pointer, also outside of it
function dragOn(element: HTMLElement, event: PointerEvent, onMove: (x: number, y: number) => void) {
  const move = (e: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    onMove(
      clamp((e.clientX - rect.left) / rect.width),
      clamp((e.clientY - rect.top) / rect.height),
    );
  };

  element.setPointerCapture(event.pointerId);
  move(event);
  element.onpointermove = move;
  element.onpointerup = () => (element.onpointermove = null);
}

function dragSquare(event: PointerEvent) {
  dragOn(event.currentTarget as HTMLElement, event, (x, y) => pick(hue.value, x, 1 - y));
}

function dragHue(event: PointerEvent) {
  dragOn(event.currentTarget as HTMLElement, event, (x) =>
    pick(x * 360, saturation.value, brightness.value),
  );
}

// Arrow keys move the focused handle in small steps
function nudgeSquare(event: KeyboardEvent) {
  const step = event.shiftKey ? 0.1 : 0.02;
  const moves: Record<string, [number, number]> = {
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
    ArrowUp: [0, step],
    ArrowDown: [0, -step],
  };
  const move = moves[event.key];
  if (!move) return;

  event.preventDefault();
  pick(hue.value, clamp(saturation.value + move[0]), clamp(brightness.value + move[1]));
}

function nudgeHue(event: KeyboardEvent) {
  const step = event.shiftKey ? 30 : 5;
  const moves: Record<string, number> = {
    ArrowLeft: -step,
    ArrowDown: -step,
    ArrowRight: step,
    ArrowUp: step,
  };
  const move = moves[event.key];
  if (!move) return;

  event.preventDefault();
  pick(clamp(hue.value + move, 360), saturation.value, brightness.value);
}

// Like the browser's own picker, the value can be typed as HEX, RGB or HSL
const FORMATS = {
  HEX: [],
  RGB: [
    { label: 'R', max: 255 },
    { label: 'G', max: 255 },
    { label: 'B', max: 255 },
  ],
  HSL: [
    { label: 'H', max: 360 },
    { label: 'S', max: 100 },
    { label: 'L', max: 100 },
  ],
};
type Format = keyof typeof FORMATS;

const FORMAT_NAMES = Object.keys(FORMATS) as Format[];

const format = ref<Format>('HEX');
const isFormatMenuOpen = ref(false);
const formatMenu = ref<HTMLElement | null>(null);

function chooseFormat(name: Format) {
  format.value = name;
  isFormatMenuOpen.value = false;
}

function closeFormatMenuOnOutsideClick(event: PointerEvent) {
  if (!formatMenu.value?.contains(event.target as Node)) {
    isFormatMenuOpen.value = false;
  }
}

const channelValues = computed(() =>
  (format.value === 'HSL' ? rgbToHsl(pickedRgb.value) : pickedRgb.value).map(Math.round),
);

function setChannel(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const number = Number(input.value);
  if (input.value === '' || Number.isNaN(number)) return;

  const channels = [...channelValues.value];
  channels[index] = clamp(number, FORMATS[format.value][index].max);
  setFromRgb(format.value === 'HSL' ? hslToRgb(channels) : channels);
}

function setHex(event: Event) {
  const rgb = hexToRgb((event.target as HTMLInputElement).value);
  if (rgb) setFromRgb(rgb);
}

// The eyedropper picks a colour from anywhere on the screen (Chromium based browsers only)
const canUseEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

async function useEyeDropper() {
  try {
    const { sRGBHex } = await new (window as any).EyeDropper().open();
    const rgb = hexToRgb(sRGBHex) ?? sRGBHex.match(/\d+/g)?.map(Number);
    if (rgb) setFromRgb(rgb);
  } catch {
    // The user closed the eyedropper with Escape
  }
}

const POPOVER_WIDTH = 240;

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);
const swatch = ref<HTMLButtonElement | null>(null);
const popover = ref<HTMLElement | null>(null);
const popoverPosition = ref({ top: '0px', left: '0px' });

// The popover lives in <body> so a scrolling parent such as the sidebar can't cut it off.
// It sits under the field, lined up with its right edge, and stays inside the window.
function placePopover() {
  if (!root.value) return;

  const rect = root.value.getBoundingClientRect();
  const left = Math.min(
    Math.max(8, rect.right - POPOVER_WIDTH),
    window.innerWidth - POPOVER_WIDTH - 8,
  );
  popoverPosition.value = { top: `${rect.bottom + 8}px`, left: `${left}px` };
}

function closeOnOutsideClick(event: PointerEvent) {
  const target = event.target as Node;
  if (!root.value?.contains(target) && !popover.value?.contains(target)) {
    isOpen.value = false;
  }
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;

  // Escape closes the format list first, then the picker
  if (isFormatMenuOpen.value) {
    isFormatMenuOpen.value = false;
    return;
  }

  isOpen.value = false;
  swatch.value?.focus();
}

watch(isOpen, (open) => {
  if (open) placePopover();
  else isFormatMenuOpen.value = false;

  const method = open ? 'addEventListener' : 'removeEventListener';
  document[method]('pointerdown', closeOnOutsideClick);
  document[method]('keydown', closeOnEscape);
  window[method]('scroll', placePopover, true);
  window[method]('resize', placePopover);
});

onBeforeUnmount(() => {
  isOpen.value = false;
});
</script>

<template>
  <div
    ref="root"
    class="color-picker"
  >
    <button
      ref="swatch"
      type="button"
      :id="id"
      class="color-swatch"
      :style="{ '--swatch-color': value || undefined }"
      aria-label="Pick a color"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    />
    <input
      type="text"
      :id="`${id}-input`"
      :name="`${id}-input`"
      class="color-input-text"
      aria-label="Color picker input"
      v-model="value"
      maxlength="9"
      placeholder="[default]"
    />

    <Teleport to="body">
      <Transition name="color-popover">
        <div
          v-if="isOpen"
          ref="popover"
          class="color-popover"
          role="dialog"
          aria-label="Color picker"
          :style="popoverPosition"
          @pointerdown="closeFormatMenuOnOutsideClick"
        >
          <div
            class="color-square"
            :style="{ '--hue': hue }"
            @pointerdown="dragSquare"
          >
            <span
              class="color-handle"
              role="slider"
              tabindex="0"
              aria-label="Saturation and brightness"
              :aria-valuetext="pickedColor"
              :style="{
                left: `${saturation * 100}%`,
                top: `${(1 - brightness) * 100}%`,
                background: pickedColor,
              }"
              @keydown="nudgeSquare"
            />
          </div>

          <div class="color-controls">
            <button
              v-if="canUseEyeDropper"
              type="button"
              class="color-tool"
              aria-label="Pick a color from the screen"
              title="Pick a color from the screen"
              @click="useEyeDropper"
            >
              <Icon
                :iconNode="pipette"
                name="pipette"
                :size="16"
                aria-hidden="true"
              />
            </button>
            <span
              class="color-preview"
              :style="{ background: pickedColor }"
            />
            <div
              class="hue-bar"
              @pointerdown="dragHue"
            >
              <span
                class="color-handle"
                role="slider"
                tabindex="0"
                aria-label="Hue"
                :aria-valuenow="Math.round(hue)"
                aria-valuemin="0"
                aria-valuemax="360"
                :style="{
                  left: `calc(8px + (100% - 16px) * ${hue / 360})`,
                  background: `hsl(${hue} 100% 50%)`,
                }"
                @keydown="nudgeHue"
              />
            </div>
          </div>

          <div class="color-fields">
            <label
              v-if="format === 'HEX'"
              class="color-field hex"
            >
              <input
                :value="pickedColor"
                maxlength="7"
                spellcheck="false"
                aria-label="Hex"
                @change="setHex"
              />
              <span>HEX</span>
            </label>
            <label
              v-else
              v-for="(channel, index) in FORMATS[format]"
              :key="`${format}-${channel.label}`"
              class="color-field"
            >
              <input
                type="number"
                min="0"
                :max="channel.max"
                :value="channelValues[index]"
                :aria-label="channel.label"
                @change="setChannel(index, $event)"
              />
              <span>{{ channel.label }}</span>
            </label>

            <div
              ref="formatMenu"
              class="format-menu"
            >
              <button
                type="button"
                class="format-button"
                aria-haspopup="listbox"
                :aria-expanded="isFormatMenuOpen"
                :aria-label="`Color format: ${format}`"
                @click="isFormatMenuOpen = !isFormatMenuOpen"
              >
                {{ format }}
                <Icon
                  :iconNode="chevronDown"
                  name="chevron-down"
                  :size="14"
                  aria-hidden="true"
                />
              </button>

              <Transition name="format-list">
                <ul
                  v-if="isFormatMenuOpen"
                  class="format-list"
                  role="listbox"
                  aria-label="Color format"
                >
                  <li
                    v-for="name in FORMAT_NAMES"
                    :key="name"
                    role="option"
                    tabindex="0"
                    class="format-option"
                    :aria-selected="name === format"
                    @click="chooseFormat(name)"
                    @keydown.enter.prevent="chooseFormat(name)"
                    @keydown.space.prevent="chooseFormat(name)"
                  >
                    {{ name }}
                    <Icon
                      v-if="name === format"
                      :iconNode="check"
                      name="check"
                      :size="14"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.color-picker {
  position: relative;
  background: var(--color-picker-bg, var(--vp-c-bg-alt));
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 3px 8px 3px 3px;
  height: auto;
  font-size: 13px;
  text-align: left;
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  align-items: center;
  gap: 2px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
  transition-duration: 0.25s !important;
}

/* The colour swatch shows the chosen colour and grows a little to show it can be clicked */
.color-swatch {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--swatch-color, var(--vp-c-text-1));
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  transition-duration: 0.2s !important;
}

.color-swatch:hover,
.color-swatch[aria-expanded='true'] {
  transform: scale(1.12);
}

.color-swatch:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.color-input-text {
  width: 100%;
  height: 100%;
  padding: 0 0 0 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
  text-align: left;
  border-radius: 8px;
  cursor: text;
  transition:
    border-color 0.25s,
    background 0.4s ease;
  letter-spacing: 1px;
}

.color-picker:hover,
.color-picker:focus-within {
  border-color: var(--vp-c-brand);
}
.color-picker:focus-within {
  background-color: var(--vp-c-bg);
}

.color-popover {
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 240px;
  padding: 12px;
  cursor: default;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  transform-origin: top right;
}

/* The popover grows out of the swatch corner and fades in */
.color-popover-enter-active,
.color-popover-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s cubic-bezier(0.34, 1.4, 0.64, 1);
  transition-duration: 0.2s !important;
}

.color-popover-enter-from,
.color-popover-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(-4px);
}

.color-square {
  position: relative;
  height: 140px;
  border-radius: 8px;
  cursor: crosshair;
  touch-action: none;
  background:
    linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #fff, hsl(calc(var(--hue) * 1deg) 100% 50%));
}

.color-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-preview {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.hue-bar {
  position: relative;
  flex: 1;
  height: 12px;
  border-radius: 6px;
  cursor: pointer;
  touch-action: none;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}

.hue-bar .color-handle {
  top: 50%;
}

.color-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition:
    width 0.15s ease,
    height 0.15s ease;
  transition-duration: 0.15s !important;
  pointer-events: none;
}

.color-handle:focus-visible {
  width: 20px;
  height: 20px;
  outline: none;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.15),
    0 0 0 4px color-mix(in srgb, var(--vp-c-brand) 35%, transparent);
}

.color-tool {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  transition:
    color 0.2s,
    background-color 0.2s;
  transition-duration: 0.2s !important;
}

.color-tool:hover,
.color-tool:focus-visible {
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.color-fields {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.color-field {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.color-field input {
  width: 100%;
  height: 28px;
  padding: 0 4px;
  text-align: center;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 6px;
  -moz-appearance: textfield;
  transition: border-color 0.2s;
  transition-duration: 0.2s !important;
}

.color-field input::-webkit-inner-spin-button,
.color-field input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.color-field input:hover,
.color-field input:focus {
  border-color: var(--vp-c-brand);
}

/* Format menu: a button with the current format opens a list of HEX, RGB and HSL */
.format-menu {
  position: relative;
  flex-shrink: 0;
}

.format-button {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 28px;
  padding: 0 6px 0 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  transition:
    color 0.2s,
    background-color 0.2s;
  transition-duration: 0.2s !important;
}

.format-button:hover,
.format-button:focus-visible,
.format-button[aria-expanded='true'] {
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.format-button .lucide {
  transition: transform 0.25s ease;
  transition-duration: 0.25s !important;
}

.format-button[aria-expanded='true'] .lucide {
  transform: rotate(180deg);
}

.format-list {
  position: absolute;
  right: 0;
  bottom: calc(100% + 4px);
  z-index: 1;
  min-width: 88px;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  transform-origin: bottom right;
}

.format-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
  transition:
    color 0.15s,
    background-color 0.15s;
  transition-duration: 0.15s !important;
}

.format-option:hover,
.format-option:focus-visible {
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.format-option[aria-selected='true'] {
  color: var(--vp-c-brand-1);
}

.format-list-enter-active,
.format-list-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  transition-duration: 0.15s !important;
}

.format-list-enter-from,
.format-list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(4px);
}
</style>
