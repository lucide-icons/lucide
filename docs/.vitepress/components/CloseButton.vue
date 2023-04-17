<template>
  <button v-bind="$listeners" class="icon-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
</template>

<style scoped>

.icon-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  padding: 6px;
  border-radius: 8px;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  display: inline-flex;
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
