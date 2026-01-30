<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { copy } from '../../../data/iconNodes';
import Icon from 'lucide-vue-next/src/Icon';
import useConfetti from '../../composables/useConfetti';
const { animate, confetti } = useConfetti();
const slots = useSlots();

const copiedText = computed(() => slots.default?.()[0].children);

function copyText() {
  navigator.clipboard.writeText(copiedText.value);

  confetti();
}
</script>

<template>
  <h1
    class="icon-name confetti-button"
    :class="{ animate }"
    data-confetti-text="Copied!"
    @click="copyText"
  >
    <slot />
    <Icon
      :iconNode="copy"
      :size="20"
      class="copy-icon"
    />
  </h1>
</template>

<style scoped>
@import './confetti.css';

.icon-name {
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  transition: background ease-in 0.15s;
  padding: 2px 8px;
  border-radius: 8px;
  width: auto;
  display: inline-flex;
  margin-left: -8px;
}

.icon-name:hover {
  background-color: var(--vp-c-bg-alt);
}

.icon-name:hover .copy-icon {
  opacity: 0.9;
}

.icon-name:before,
.icon-name:after {
  left: unset !important;
  right: -20%;
}

.icon-name:before {
  text-align: center;
}

.copy-icon {
  opacity: 0;
  margin-left: 12px;
  margin-top: 6px;
  transition: ease 0.3s opacity;
}

.icon-name:hover .copy-icon:hover {
  opacity: 0.6;
}
</style>
