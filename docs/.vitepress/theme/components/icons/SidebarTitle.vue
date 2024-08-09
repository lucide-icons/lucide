<template>
  <h2 class="sidebar-title sidebar-text">
    <slot />
  </h2>
</template>

<style scoped>
.sidebar-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.sidebar-text {
  line-height: 24px;
  font-size: 14px;
  display: block;
  transition: color 0.25s;
  padding: 4px 0;
}
</style>
