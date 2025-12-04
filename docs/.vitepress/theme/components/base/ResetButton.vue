<script setup lang="ts">
import { rotateCw } from '../../../data/iconNodes'
import Icon from 'lucide-vue-next/src/Icon'
import IconButton from "./IconButton.vue";
</script>

<template>
  <IconButton class="reset-button">
    <Icon :size="20" :iconNode="rotateCw" />
  </IconButton>
</template>

<style scoped>
.reset-button {
  background: none;
  padding: 0;
}

.reset-button .lucide {
  transition: ease-in-out 0.1s transform;
}

.reset-button:hover {
  background: none;
  border-color: transparent;
}

/* a rotate css animation keyframes */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}

.reset-button:active .lucide {
  transform: rotate(45deg);
}
</style>
