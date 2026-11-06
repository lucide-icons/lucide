<template>
  <div class="overview-link-grid">
    <slot />
  </div>
</template>

<style>
.overview-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.overview-link-grid > * {
  box-sizing: border-box;
  padding: 8px;
}

@media (min-width: 960px) {
  .overview-link-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (min-width: 1280px) {
  .overview-link-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

</style>
