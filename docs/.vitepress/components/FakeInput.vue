<script setup>
</script>

<template>
  <button class="fake-input">
    <slot/>
  </button>
</template>

<style scoped>
.fake-input {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 12px 16px;
  height: auto;
  font-size: 14px;
  box-shadow: var(--vp-shadow-4), var(--vp-shadow-2);
  text-align: left;
  border: 1px solid transparent;
  cursor: text;
}

.fake-input:hover, .fake-input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}
</style>
