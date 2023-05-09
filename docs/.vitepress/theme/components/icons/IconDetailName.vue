<template>
  <h1 class="icon-name">
    <slot />
  </h1>
</template>

<style scoped>
.icon-name {
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  transition: background ease-in .15s;;
  padding: 2px 8px;
  border-radius: 8px;
  width: auto;
  display: inline-block;
  margin-left: -8px;
}

.icon-name:hover {
  background-color: var(--vp-c-bg-alt);
}
</style>
