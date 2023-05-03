<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'

const emit = defineEmits(['end-of-page'])

const onIntersectionObserver: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  if (isIntersecting) {
    emit('end-of-page')
  }
}
</script>

<template>
  <div v-intersection-observer="onIntersectionObserver" />
</template>
