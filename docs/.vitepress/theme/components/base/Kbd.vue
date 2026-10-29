<template>
  <kbd class="kbd"><slot /></kbd>
</template>

<style scoped>
.kbd {
  display: inline-block;
  min-width: 24px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
</style>
