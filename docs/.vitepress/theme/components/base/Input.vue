<script lang="ts">
export default {
  inheritAttrs: false,
};

export interface InputProps {
  type: string;
  modelValue: string;
  shortcut?: string;
}
</script>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import Icon from '@lucide/vue/src/Icon';
import { x } from '../../../data/iconNodes';
import Button from './Button.vue';

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
});

const input = ref();
const wrapperEl = ref();
const shortcutEl = ref();

const emit = defineEmits(['change', 'input', 'update:modelValue']);

const updateShortcutSpacing = () => {
  nextTick(() => {
    if (shortcutEl.value && wrapperEl.value) {
      const shortcutWidth = shortcutEl.value.offsetWidth;
      wrapperEl.value.style.setProperty('--shortcut-width', `${shortcutWidth}px`);
    }
  });
};

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

onMounted(updateShortcutSpacing);
watch(() => props.shortcut, updateShortcutSpacing);

function onClear() {
  emit('update:modelValue', '');
  input.value.focus();
}

defineExpose({
  focus: () => {
    input.value.focus();
  },
});
</script>

<template>
  <div
    class="input-wrapper"
    ref="wrapperEl"
  >
    <slot
      name="icon"
      class="icon"
    />
    <input
      :type="type"
      class="input"
      :class="{ 'has-icon': $slots.icon, 'has-shortcut': shortcut }"
      ref="input"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Button
      @click="onClear"
      v-if="type === 'search' && modelValue"
      class="clear-button"
      aria-label="Clear input"
      :style="{ right: isMac ? '50px' : '68px' }"
    >
      <Icon
        :iconNode="x"
        name="x"
        :size="20"
      />
    </Button>
    <kbd
      v-if="shortcut"
      class="shortcut"
      ref="shortcutEl"
      >{{ shortcut }}</kbd
    >
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
}

.input {
  justify-content: flex-start;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0 10px 0 12px;
  width: 100%;
  height: 40px;
  background-color: var(--vp-c-bg-alt);
  font-size: 14px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s,
    box-shadow 0.25s;
  transition-duration: 0.25s !important;
}

.input.has-shortcut {
  padding-right: calc(var(--shortcut-width, 40px) + 22px);
}

/* Same as FakeInput: a quiet border at rest, a brand border with a soft ring on hover and focus */
.input:hover,
.input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand) 15%, transparent);
}
.input:focus {
  background-color: var(--vp-c-bg);
}

.input.has-icon {
  padding-left: 52px;
}

.clear-button {
  position: absolute;
  right: 68px;
  top: 9px;
  padding: 4px;
  transition: background-color 0.25s;
}

.shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  font-size: 12px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  pointer-events: none;
}

.input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.input[type="search"]::-ms-clear {
  display: none;
}

.input[type="search"]::-o-clear {
  display: none;
}

.input[type="search"]::-moz-clear {
  display: none;
}

@media (hover: none) {
  .shortcut {
    display: none;
  }

  .clear-button {
    right: 16px !important;
  }
}
</style>

<style>
.input-wrapper > svg {
  position: absolute;
  left: 16px;
  top: 12px;
  z-index: 1;
  color: var(--vp-c-text-2);
  pointer-events: none;
  transition: color 0.25s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-duration: 0.25s, 0.3s !important;
}

/* Like the FakeInput search icon, it tilts as if it starts looking */
.input-wrapper > svg:has(+ .input.has-icon:hover),
.input-wrapper > svg:has(+ .input.has-icon:focus) {
  color: var(--vp-c-brand-1);
}
</style>
