<script setup lang="ts">
import { setLucideProps } from '@lucide/vue';

setLucideProps({ color: 'purple', size: 32, strokeWidth: 3 });
</script>

<template>
  <slot />
</template>
