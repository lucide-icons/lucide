<script setup lang="ts">
import { ref } from 'vue';
import { rotateCw } from '../../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';
import Button from './Button.vue';

const spinning = ref(false);
</script>

<template>
  <Button
    class="reset-button"
    :class="{ spinning }"
    aria-label="Reset style"
    @click="spinning = true"
    @animationend="spinning = false"
  >
    <Icon
      :size="20"
      :iconNode="rotateCw"
      name="rotate-cw"
    />
  </Button>
</template>

<style scoped>
.reset-button {
  transition: ease-in-out 0.25s opacity;
  transition-duration: 0.25s !important;
  background: none;
  padding: 0;
}

/* The arrow spins once in place when clicked */
.reset-button.spinning .lucide {
  animation: rotate 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation-duration: 0.6s !important;
}

.reset-button:hover {
  background: none;
  border-color: transparent;
}

.reset-button:disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
