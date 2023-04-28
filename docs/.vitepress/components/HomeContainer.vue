<template>
  <div class="home-container">
    <slot />
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  padding: 24px;
}

@media (min-width: 640px) {
  .home-container {
    padding: 48px;
  }
}

@media (min-width: 960px) {
  .home-container {
    padding: 64px;
  }
}
</style>
