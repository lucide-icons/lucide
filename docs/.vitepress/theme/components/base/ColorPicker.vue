<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, ref } from 'vue';
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { onClickOutside, useEventListener, useMounted } from '@vueuse/core';

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

// vue-color is only loaded once the picker is about to open
const loadColorPickerPanel = () => import('./ColorPickerPanel.vue');
const ColorPickerPanel = defineAsyncComponent(loadColorPickerPanel);

// The server renders the default colour, match it on the first client render
const isMounted = useMounted();
const swatchColor = computed(() => {
  if (!isMounted.value || !value.value || !CSS.supports('color', value.value)) {
    return 'currentColor';
  }

  return value.value;
});

const isOpen = ref(false);
const swatchRef = ref<HTMLButtonElement | null>(null);
const textInputRef = ref<HTMLInputElement | null>(null);
const floatingRef = ref<HTMLElement | null>(null);
const panelId = computed(() => `${props.id}-panel`);

const { floatingStyles } = useFloating(swatchRef, floatingRef, {
  placement: 'bottom-start',
  middleware: [offset(8), flip({ padding: 16 }), shift({ padding: 16 })],
  whileElementsMounted: autoUpdate,
  // Position with top/left, so the open transition can use transform
  transform: false,
});

function close({ focusSwatch = false } = {}) {
  isOpen.value = false;

  if (focusSwatch) {
    swatchRef.value?.focus();
  }
}

onClickOutside(floatingRef, () => close(), { ignore: [swatchRef] });

const openDocument = () => (isOpen.value ? document : null);

useEventListener(openDocument, 'keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close({ focusSwatch: true });
  }
});

// Close when focus moves somewhere else, for example with Shift+Tab from the swatch
useEventListener(openDocument, 'focusin', (event: FocusEvent) => {
  const target = event.target as Node;

  if (!swatchRef.value?.contains(target) && !floatingRef.value?.contains(target)) {
    close();
  }
});

function getPanelFocusables() {
  return Array.from(
    floatingRef.value?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? [],
  );
}

// The panel lives at the end of the body, so Tab from the swatch has to move into it by hand
async function onSwatchKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab' || event.shiftKey || !isOpen.value) {
    return;
  }

  event.preventDefault();
  await nextTick();
  (getPanelFocusables()[0] ?? floatingRef.value)?.focus();
}

/*
 * Tab through the panel by hand. vue-color's sliders prevent the default of every key, so the
 * browser won't move focus away from them. Leaving the panel continues where the swatch is.
 */
function onPanelKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab') {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const focusables = getPanelFocusables();
  const index = focusables.indexOf(document.activeElement as HTMLElement);
  const next = focusables[index + (event.shiftKey ? -1 : 1)];

  if (next) {
    next.focus();
  } else if (event.shiftKey) {
    swatchRef.value?.focus();
  } else {
    close();
    textInputRef.value?.focus();
  }
}
</script>

<template>
  <div
    class="color-picker"
    @pointerenter="loadColorPickerPanel"
    @focusin="loadColorPickerPanel"
  >
    <button
      ref="swatchRef"
      type="button"
      :id="id"
      class="color-swatch"
      aria-label="Open color picker"
      aria-haspopup="dialog"
      :aria-expanded="String(isOpen)"
      :aria-controls="isOpen ? panelId : undefined"
      :style="{ '--swatch-color': swatchColor }"
      @click="isOpen = !isOpen"
      @keydown="onSwatchKeydown"
    />
    <input
      ref="textInputRef"
      type="text"
      :id="`${id}-input`"
      :name="`${id}-input`"
      class="color-input-text"
      aria-label="Color picker input"
      v-model="value"
      maxlength="9"
      placeholder="[default]"
    />
    <!-- Teleported, so the sidebar's scroll container doesn't clip it -->
    <Teleport to="body">
      <Transition name="color-picker-popover">
        <div
          v-if="isOpen"
          ref="floatingRef"
          :id="panelId"
          class="color-picker-popover"
          role="dialog"
          aria-label="Color picker"
          tabindex="-1"
          :style="floatingStyles"
          @keydown.capture="onPanelKeydown"
        >
          <ColorPickerPanel v-model="value" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.color-swatch {
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  /* The colour on top of a checkerboard, so transparent colours are visible */
  background:
    linear-gradient(var(--swatch-color), var(--swatch-color)),
    repeating-conic-gradient(#e6e6e6 0% 25%, #fff 0% 50%) 0 0 / 8px 8px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.25s;
}

.color-swatch:focus-visible,
.color-swatch[aria-expanded='true'] {
  outline: none;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.1),
    0 0 0 2px var(--vp-c-bg),
    0 0 0 4px var(--vp-c-brand);
}

.color-picker {
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

.color-picker-popover {
  z-index: 100;
  box-sizing: border-box;
  width: 256px;
  min-height: 248px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  outline: none;
}

.color-picker-popover-enter-active,
.color-picker-popover-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.color-picker-popover-enter-from,
.color-picker-popover-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
