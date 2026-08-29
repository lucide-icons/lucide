<script setup lang="ts">
import type { IconEntity } from '../../types';
import { computed } from 'vue';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import IconButton from '../base/IconButton.vue';
import IconContributors from './IconContributors.vue';
import IconPreview from './IconPreview.vue';
import { x, expand } from '../../../data/iconNodes';
import { useRouter } from 'vitepress';
import IconInfo from './IconInfo.vue';
import Badge from '../base/Badge.vue';
import { computedAsync } from '@vueuse/core';
import { satisfies } from 'semver';
import { useExternalLibs } from '../../composables/useExternalLibs';

const props = defineProps<{
  iconName: string | null;
}>();

const { externalIconNodes } = useExternalLibs();

const { go } = useRouter();

const icon = computedAsync<IconEntity | null>(async () => {
  if (props.iconName) {
    try {
      if (props.iconName.includes(':')) {
        const [library, name] = props.iconName.split(':');

        return externalIconNodes.value[library].find((icon) => icon.name === name);
      } else {
        return (await import(`../../../data/iconDetails/${props.iconName}.ts`))
          .default as IconEntity;
      }
    } catch (err) {
      if (!props.iconName.includes(':')) {
        go(`/icons/${props.iconName}`);
      }
    }
  }
  return null;
}, null);

const emit = defineEmits(['close']);
const isOpen = computed(() => !!icon.value);

function releaseTagLink(version) {
  const shouldAddV = satisfies(version, `<0.266.0`);

  return `https://github.com/lucide-icons/lucide/releases/tag/${shouldAddV ? 'v' : ''}${version}`;
}

function onClose() {
  emit('close');
}

const CloseIcon = createLucideIcon('Close', x);
const Expand = createLucideIcon('Expand', expand);

import getStudioLink from '../../utils/getStudioLink';

const brushSparkles = [
  ['path', { d: 'M10 3H8' }],
  ['path', { d: 'm11 10 3 3' }],
  ['path', { d: 'M20 15v4' }],
  ['path', { d: 'M22 17h-4' }],
  ['path', { d: 'M4 5v4' }],
  ['path', { d: 'M6 7H2' }],
  ['path', { d: 'M6.5 21A3.5 3.5 0 103 17.5a2.62 2.62 0 01-.708 1.792A1 1 0 003 21z' }],
  ['path', { d: 'M9 2v2' }],
  ['path', { d: 'M9.969 17.031 21.378 5.624a1 1 0 00-3.002-3.002L6.967 14.031' }],
];

const BrushSparklesIcon = createLucideIcon('BrushSparkels', brushSparkles);

function openStudio() {
  if (typeof window !== 'undefined' && icon.value) {
    const link = getStudioLink(icon.value.name, icon.value.iconNode, 'icon-detail-overlay');
    window.open(link, '_blank');
  }
}
</script>

<template>
  <Transition
    name="drawer"
    appear
  >
    <div
      class="overlay-container"
      v-if="icon"
    >
      <div class="overlay-panel">
        <nav class="overlay-menu">
          <Badge
            v-if="icon.createdRelease"
            class="version"
            :href="releaseTagLink(icon.createdRelease.version)"
            >v{{ icon.createdRelease.version }}</Badge
          >
          <IconButton
            title="Edit"
            aria-label="Edit"
            @click="openStudio"
          >
            <BrushSparklesIcon />
          </IconButton>
          <IconButton
            @click="
              go(
                icon.externalLibrary
                  ? `/icons/${icon.externalLibrary}/${icon.name}`
                  : `/icons/${icon.name}`,
              )
            "
          >
            <component :is="Expand" />
          </IconButton>
          <IconButton @click="onClose">
            <component :is="CloseIcon" />
          </IconButton>
        </nav>
        <IconPreview
          id="previewer"
          :name="icon.name"
          :iconNode="icon.iconNode"
          customizable
        />
        <IconInfo
          :icon="icon"
          popoverPosition="top"
        >
          <template v-slot:footer>
            <IconContributors
              :icon="icon"
              class="contributors"
            />
          </template>
        </IconInfo>
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
  height: 288px;
  padding: 24px;
  display: flex;
  box-shadow: var(--vp-shadow-5);
}

.icon-info {
  padding-left: 24px;
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
  align-items: center;
}

.drawer-enter-active {
  transition:
    opacity 0.5s,
    transform 0.25s ease;
}

.drawer-leave-active {
  transition:
    opacity 0.25s ease,
    transform 1.6s ease-out;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.version {
  margin-right: 24px;
}

.contributors {
  justify-content: flex-end;
}
</style>
