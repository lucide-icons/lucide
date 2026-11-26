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

@media (min-width: 40rem) {
  .home-container {
    padding-inline: 48px;
    margin-block: 48px;
  }
}

@media (min-width: 60rem) {
  .home-container {
    padding-inline: 64px;
    margin-block: 64px;
  }
}

@media (min-width: 80rem) {
  .home-container {
    margin: 64px auto;
    max-width: 1152px;
    padding: 0;
  }
}
</style>
