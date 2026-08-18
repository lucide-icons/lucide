<template>
  <div class="card-grid-flex">
    <slot />
  </div>
</template>

<style>
.card-grid-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  align-content: space-evenly;
  box-sizing: border-box;
  margin: -8px;
}

.card-grid-flex > * {
  flex-basis: 100%;
  box-sizing: border-box;
  padding: 8px;
}

@media (min-width: 960px) {
  .card-grid-flex > * {
    flex-basis: 50%;
  }
}

@media (min-width: 1280px) {
  .card-grid-flex > * {
    flex-basis: 33.33%;
  }
}

</style>
