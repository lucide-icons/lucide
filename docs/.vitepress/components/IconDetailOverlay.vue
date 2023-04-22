<script setup lang="ts">
  import type { IconEntity } from '../types'
  import { ref, computed } from 'vue'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';
import IconButton from './IconButton.vue';
import IconPreview from './IconPreview.vue';

  const props = defineProps<{
    icon: IconEntity
  }>()

  const emit = defineEmits(['close'])

  const isOpen = computed(() => !!props.icon)

  function onClose() {
    emit('close')
  }

  const size = 24

  const gridLines = computed(() => Array.from({ length:(size - 1) }))

  const iconComponent = computed(() => {
    if (!props.icon) return null
    return createLucideIcon(props.icon.name, props.icon.iconNode)
  })

  const tags = computed(() => {
    if (!props.icon) return []
    return props.icon.tags.join(' • ')
  })
</script>

<template>
  <Transition name="drawer">
    <div class="overlay-container" v-if="props.icon">
      <div class="overlay-panel">
        <IconButton class="close-button" @click="onClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </IconButton>
        <IconPreview :name="props.icon.name" :iconNode="props.icon.iconNode"/>
        <div class="icon-info">
          <h1 class="icon-name">
            {{ props.icon.name }}
          </h1>
          <p class="icon-tags">
            {{ tags }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-container {
  position: fixed;
  top: 0;
  left: var(--left, 0);
  right: var(--right, 0);
  bottom: 0;
  pointer-events: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  width: auto;
}

@media (min-width: 960px) {
  .overlay-container {
    --left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .overlay-container {
    --left: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
    --right: calc(((100% - (var(--vp-layout-max-width) - var(--vp-sidebar-width))) - 272px) / 2);
  }
  .overlay-panel {
    border-top-right-radius: 8px;
  }
}

.overlay-panel {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--vp-c-bg-elv);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  will-change: transform;
  pointer-events: all;
  height: 240px;
  padding: 24px 32px;
  display: flex;
  box-shadow: var(--vp-shadow-5);
}

.icon-info {
  padding: 0 24px;
}

.icon-name {
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 12px;
}

.icon-tags {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
}

.drawer-enter-active {
  transition: all 0.2s cubic-bezier(.21,.8,.46,.9);
}

.drawer-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

</style>
