<script setup lang="ts">
  import type { IconEntity } from '../types'
  import { ref, computed } from 'vue'
  import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';
  import IconButton from './IconButton.vue';
  import Badge from './Badge.vue';
  import ButtonMenu from './ButtonMenu.vue';
  import IconDetailName from './IconDetailName.vue';
  import IconPreview from './IconPreview.vue';
  import { x, externalLink } from '../../iconNodes'
  import { useRouter } from 'vitepress';

  const props = defineProps<{
    icon: IconEntity
  }>()

  const emit = defineEmits(['close'])

  const isOpen = computed(() => !!props.icon)

  function onClose() {
    emit('close')
  }

  const { go } = useRouter()

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

  const CloseIcon = createLucideIcon('Close', x)
  const ExternalLinkIcon = createLucideIcon('ExternalLink', externalLink)
</script>

<template>
  <Transition name="drawer">
    <div class="overlay-container" v-if="props.icon">
      <div class="overlay-panel">
        <nav class="overlay-menu">
          <IconButton  @click="go(`/icons/${icon.name}`)">
            <component :is="ExternalLinkIcon" />
          </IconButton>
          <IconButton  @click="onClose">
            <component :is="CloseIcon" />
          </IconButton>
        </nav>
        <IconPreview
          :name="props.icon.name"
          :iconNode="props.icon.iconNode"
          customizable
        />
        <div class="icon-info">
          <IconDetailName class="icon-name">
            {{ props.icon.name }}
          </IconDetailName>
          <!-- <p class="icon-tags">
            {{ tags }}
          </p> -->
          <div class="categories">
            <Badge v-for="category in icon.categories" :href="`/icons/categories#${category}`">
              {{ category }}
            </Badge>
          </div>

          <ButtonMenu
            :options="[
              { text: 'Copy SVG' , onClick: () => {} },
              { text: 'Copy Data URL' , onClick: () => {} },
              { text: 'Copy PNG' , onClick: () => {} },
            ]"
            />

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
  flex-basis: 100%;

}

.icon-tags {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.overlay-menu {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
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

.categories {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

</style>
