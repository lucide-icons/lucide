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
  top: var(--vp-layout-top-height);
  width: 100%;
  display: flex;
  margin-bottom: 32px;
  background: var(--vp-c-bg);
  box-shadow: 0 16px 24px var(--vp-c-bg);
}

@media (min-width: 960px) {
  .search-bar {
    padding-top: 32px;
    margin-top: calc((var(--vp-layout-top-height, 0px) + 32px) * -1);
    top: calc(var(--vp-layout-top-height, 0px) + 64px);
  }
}
</style>
