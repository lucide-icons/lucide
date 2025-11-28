<script setup lang="ts">
import { useMutationObserver, useScriptTag } from '@vueuse/core';
import { useData } from 'vitepress';
import { onMounted, useTemplateRef, watchEffect } from 'vue';

const { isDark } = useData()
const el = useTemplateRef('el')

useScriptTag('https://snack.expo.dev/embed.js')

watchEffect(() => {
  console.log(isDark.value);
})

useMutationObserver(el, (mutations) => {
  const container = el.value;
  if (mutations[0]) {
    if ('ExpoSnack' in window) {
      window?.ExpoSnack?.remove(container);
      window?.ExpoSnack?.append(container);
    }
  }
}, {
  attributes: true,
})

onMounted(() => {
  const container = el.value;
  if ('ExpoSnack' in window) {
    window?.ExpoSnack?.append(container);
  }
})
</script>

<template>
  <div v-bind="$attrs" class="snack-player" ref="el" :data-snack-theme="isDark ? 'dark' : 'light'" />
</template>

<style>
.snack-player {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  width: 100%;
  height: 635px;
  margin-bottom: 24px;
  overflow: hidden;
}
</style>
