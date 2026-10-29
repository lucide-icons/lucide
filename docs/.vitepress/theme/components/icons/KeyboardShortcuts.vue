<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Icon from '@lucide/vue/src/Icon';
import Kbd from '../base/Kbd.vue';
import { keyboard, x } from '~/.vitepress/data/iconNodes';

const dialog = ref<HTMLDialogElement | null>(null);
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

function close() {
  dialog.value?.close();
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
    class="shortcuts-button"
    aria-haspopup="dialog"
    aria-label="Keyboard shortcuts"
    title="Keyboard shortcuts"
    @click="open"
  >
    <Icon
      :iconNode="keyboard"
      name="keyboard"
      aria-hidden="true"
    />
  </button>

  <dialog
    ref="dialog"
    class="shortcuts-dialog"
    tabindex="-1"
    aria-labelledby="shortcuts-title"
    @click="handleDialogClick"
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
.shortcuts-button {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 11px 14px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 0.25s,
    border-color 0.25s;
}

.shortcuts-button:hover,
.shortcuts-button:focus-visible {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand);
}

.shortcuts-button svg {
  width: 20px;
  height: 20px;
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
  background: rgba(0, 0, 0, 0.5);
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
