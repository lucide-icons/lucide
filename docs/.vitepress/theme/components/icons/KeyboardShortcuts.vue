<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import Icon from '@lucide/vue/src/Icon';
import Kbd from '../base/Kbd.vue';
import { x } from '~/.vitepress/data/iconNodes';

const dialog = ref<HTMLDialogElement | null>(null);
const isClosing = ref(false);
const modifierKey = ref('Ctrl');

const shortcuts = [
  { keys: ['mod', 'K'], alternative: ['/'], description: 'Search' },
  { keys: ['Shift', 'Click'], description: 'Copy the SVG of an icon' },
  { keys: ['mod', 'Click'], description: 'Copy the name of an icon' },
  { keys: ['Arrow keys'], description: 'Move through the search results' },
  { keys: ['Enter'], description: 'Open the selected icon' },
  { keys: ['mod', 'C'], description: 'Copy the name of the selected icon' },
  { keys: ['Shift', 'C'], description: 'Copy the SVG of the selected icon' },
  { keys: ['Shift', '?'], description: 'Show keyboard shortcuts' },
];

function keyLabel(key: string) {
  return key === 'mod' ? modifierKey.value : key;
}

function open() {
  dialog.value?.showModal();
  // Focus the dialog itself rather than its close button, so the button is not shown as selected
  dialog.value?.focus();
}

// The dialog leaves the top layer as soon as it closes, so play the exit transition first
async function close() {
  const element = dialog.value;

  if (!element?.open || isClosing.value) return;

  isClosing.value = true;
  await nextTick();
  await Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
  element.close();
  isClosing.value = false;
}

function handleDialogClick(event: MouseEvent) {
  // A click on the backdrop lands on the dialog element itself
  if (event.target === dialog.value) {
    close();
  }
}

function isTyping(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null;

  return (
    target?.isContentEditable ||
    target?.tagName === 'INPUT' ||
    target?.tagName === 'TEXTAREA' ||
    target?.tagName === 'SELECT'
  );
}

// The ? key opens the dialog, except while typing in a field
function handleKeydown(event: KeyboardEvent) {
  if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping(event)) {
    event.preventDefault();
    open();
  }
}

onMounted(() => {
  modifierKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl';
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <button
    type="button"
    class="keyboard-shortcuts-hint"
    aria-haspopup="dialog"
    @click="open"
  >
    <span class="hint-label">Keyboard shortcuts</span>
    <span class="hint-keys">
      <Kbd>Shift</Kbd>
      <span>+</span>
      <Kbd>?</Kbd>
    </span>
  </button>

  <dialog
    ref="dialog"
    class="shortcuts-dialog"
    :class="{ closing: isClosing }"
    tabindex="-1"
    aria-labelledby="shortcuts-title"
    @click="handleDialogClick"
    @cancel.prevent="close"
  >
    <div class="shortcuts-header">
      <h2 id="shortcuts-title">Keyboard shortcuts</h2>
      <button
        type="button"
        class="shortcuts-close"
        aria-label="Close"
        @click="close"
      >
        <Icon
          :iconNode="x"
          name="x"
          aria-hidden="true"
        />
      </button>
    </div>

    <dl class="shortcuts-list">
      <div
        v-for="shortcut in shortcuts"
        :key="shortcut.description"
        class="shortcut-row"
      >
        <dt class="shortcut-keys">
          <template
            v-for="(key, index) in shortcut.keys"
            :key="key"
          >
            <span
              v-if="index > 0"
              class="shortcut-plus"
              >+</span
            >
            <Kbd>{{ keyLabel(key) }}</Kbd>
          </template>
          <template v-if="shortcut.alternative">
            <span class="shortcut-or">or</span>
            <Kbd
              v-for="key in shortcut.alternative"
              :key="key"
              >{{ key }}</Kbd
            >
          </template>
        </dt>
        <dd class="shortcut-description">{{ shortcut.description }}</dd>
      </div>
    </dl>
  </dialog>
</template>

<style scoped>
.keyboard-shortcuts-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding: 24px 0px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12px;
  color: var(--vp-c-text-1);
  position: sticky;
  bottom: -96px;
  background-color: var(--vp-sidebar-bg-color);
  width: 100%;
  cursor: pointer;
}

.hint-keys {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
}

.shortcuts-dialog {
  width: min(480px, calc(100vw - 32px));
  padding: 20px 24px 24px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-4);
  outline: none;
}

.shortcuts-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.shortcuts-dialog[open] {
  transition:
    opacity 150ms ease-out,
    transform 200ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

.shortcuts-dialog[open]::backdrop {
  transition: background-color 150ms ease-out;
}

@starting-style {
  .shortcuts-dialog[open] {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }

  .shortcuts-dialog[open]::backdrop {
    background-color: transparent;
  }
}

.shortcuts-dialog.closing {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  transition:
    opacity 150ms ease-in,
    transform 150ms ease-in;
}

.shortcuts-dialog.closing::backdrop {
  background-color: transparent;
  transition: background-color 150ms ease-in;
}

.shortcuts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.shortcuts-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.shortcuts-close {
  display: flex;
  padding: 4px;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
}

.shortcuts-close:hover,
.shortcuts-close:focus-visible {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.shortcuts-close svg {
  width: 20px;
  height: 20px;
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
}

.shortcut-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.shortcut-keys {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  order: 2;
}

.shortcut-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.shortcut-plus,
.shortcut-or {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.shortcut-or {
  margin: 0 4px;
}
</style>
