<script setup lang="ts">
import Badge from '../base/Badge.vue';
import { moveRight } from '../../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';
import { data } from './HomeHeroInfoBefore.data';
const rocketDuoTone = [
  [
    'path',
    {
      d: 'M8 18a2 2 0 0 0-2-2c-2.53-.078-3.247 3.605-3.5 5.5 1.895-.253 5.578-.97 5.5-3.5',
      fill: 'currentColor',
      opacity: 0.5,
    },
  ],
  [
    'path',
    {
      d: 'M22 2c0 2.72-.78 7.5-6 11 0 0 1.08 3.38 0 5-.969 1.448-4 2-4 2v-5l-3-3H4s.553-3.033 2-4c1.616-1.077 4.982.043 5 .05A12.88 12.88 0 0 1 22 2m-6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
    },
  ],
] as const;
</script>

<template>
  <div class="info">
    <Badge :href="`https://github.com/lucide-icons/lucide/releases/tag/${data.version}`">
      v{{ data.version }}
    </Badge>
    <Badge
      class="badge-special confetti-button animate"
      href="/guide/version-1"
    >
      <Icon :iconNode="rocketDuoTone" />
      Version 1
      <Icon
        :iconNode="moveRight"
        class=""
      />
    </Badge>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;
}

@media (min-width: 960px) {
  .info {
    justify-content: flex-start;
  }
}

.badge {
  display: inline-flex;
  gap: 8px;
  padding: 4px 8px;
}

.badge-special {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-underline-offset: 2px;
  align-items: center;
}

.badge-special::before,
.badge-special::after {
  animation-delay: 0.5s !important;
  animation-duration: 5s !important;
  animation-iteration-count: infinite !important;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
  transform: translateX(32px);
}
</style>

<style>
@import '../icons/confetti.css';
</style>
