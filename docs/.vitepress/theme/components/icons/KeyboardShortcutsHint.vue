<script setup lang="ts">
import Kbd from '../base/Kbd.vue';
</script>

<template>
  <button class="keyboard-shortcuts-hint">
    <span class="hint-label">Keyboard shortcuts</span>
    <span class="hint-keys">
      <Kbd>Shift</Kbd>
      <span>+</span>
      <Kbd>?</Kbd>
    </span>
  </button>
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
}

.hint-keys {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
}
</style>
