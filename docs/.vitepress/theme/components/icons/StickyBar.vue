<template>
  <div class="search-bar">
    <slot />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 16px;
  position: sticky;
  z-index: 10;
  top: 48px;
  padding-top: 24px;
  margin-top: -32px;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  background: var(--vp-c-bg);
  box-shadow: 0 16px 24px var(--vp-c-bg);
}

@media (min-width: 960px) {
  .search-bar {
    padding-top: 32px;
    top: 64px;
  }
}
</style>
