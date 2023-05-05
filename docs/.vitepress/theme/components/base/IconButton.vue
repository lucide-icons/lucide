<template>
  <button v-bind="$attrs" class="icon-button">
    <slot />
  </button>
</template>

<style scoped>

.icon-button {
  display: inline-flex;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  padding: 6px;
  border-radius: 8px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  /* width: 56px;
  height: 56px; */
  font-size: 24px;
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.icon-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.icon-button:active {
    border-color: var(--vp-button-alt-active-border);
    color: var(--vp-button-alt-active-text);
    background-color: var(--vp-button-alt-active-bg);
}

.icon-button.active {
  border-color: var(--vp-c-brand);
  /* color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg); */
}
</style>
