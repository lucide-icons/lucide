<script setup lang="ts">
import { ref } from 'vue';
import HomeHeroIconsAnimation from './HomeHeroIconsAnimation.vue'

const animationRun = ref(1)
</script>

<template>
  <HomeHeroIconsAnimation
    :key="animationRun"
    @animation-complete="animationRun++"
  />
</template>
