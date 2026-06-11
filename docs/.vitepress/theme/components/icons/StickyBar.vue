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
  gap:16px;
}

.search-bar :deep(.select-button) {
  padding: 11px 16px 11px 16px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  flex-shrink: 0;
  flex: 1;
  font-weight: 500;
  cursor: pointer;
}

.search-bar :deep(.select-button):hover,
.search-bar :deep(.select-button):focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.search-bar :deep(.select-options) {
  min-width: 160px;
}

.search-bar :deep(.select-option) {
  padding-right: 36px;
  padding-left: 8px;
}

.search-bar :deep(.select-icon) {
  display: none;
}

@media (min-width: 960px) {
  .search-bar {
    padding-top: 32px;
    margin-top: calc((var(--vp-layout-top-height, 0px) + 32px) * -1);
    top: calc(var(--vp-layout-top-height, 0px) + 64px);
  }
}
</style>
