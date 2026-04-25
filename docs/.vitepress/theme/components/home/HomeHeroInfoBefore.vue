<script setup lang="ts">
import Badge from '../base/Badge.vue';
import { moveRight } from '../../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';
import { data } from './HomeHeroInfoBefore.data';
import RocketDuotoneIcon from './RocketDuotoneIcon.ts';
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
      <Icon :iconNode="RocketDuotoneIcon" />
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
