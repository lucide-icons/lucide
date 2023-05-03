<template>
  <div class="home-container">
    <slot />
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  padding-inline: 24px;
  margin-block: 24px;
}

@media (min-width: 640px) {
  .home-container {
    padding-inline: 48px;
    margin-block: 48px;
  }
}

@media (min-width: 960px) {
  .home-container {
    padding-inline: 64px;
    margin-block: 64px;
  }
}

@media (min-width: 1280px) {
  .home-container {
    margin: 64px auto;
    max-width: 1152px;
    padding: 0;
  }
}
</style>
