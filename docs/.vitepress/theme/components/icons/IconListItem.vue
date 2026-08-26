<script setup lang="ts">
import { computed } from 'vue';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import Icon from '@lucide/vue/src/Icon';
import { useMediaQuery } from '@vueuse/core';
import { useRouter } from 'vitepress';
import { diamond } from '../../../data/iconNodes';

export type IconNode = [elementName: string, attrs: Record<string, string>][];

const props = defineProps<{
  name: string;
  iconNode: IconNode;
  active: boolean;
  aliases?: string[];
  deprecated?: boolean;
  externalLibrary?: string;
  overlayMode?: boolean;
}>();

const emit = defineEmits(['setActiveIcon']);

const { go } = useRouter();
const showOverlay = useMediaQuery('(min-width: 860px)');

const icon = computed(() => {
  if (!props.name || !props.iconNode) return null;
  return createLucideIcon(props.name, props.iconNode);
});

const href = computed(() =>
  props.externalLibrary ? `/icons/${props.externalLibrary}/${props.name}` : `/icons/${props.name}`,
);

function navigateToIcon(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }

  event.preventDefault();

  if (props.overlayMode && showOverlay.value) {
    window.history.pushState({}, '', href.value);
    emit(
      'setActiveIcon',
      props.externalLibrary ? `${props.externalLibrary}:${props.name}` : props.name,
    );
    return;
  }

  go(href.value);
}
</script>

<template>
  <a
    class="icon-list-item vp-raw"
    :class="{ active }"
    :href="href"
    :aria-label="name"
    @click="navigateToIcon"
  >
    <span class="icon-preview">
      <component
        :is="icon"
        class="lucide-icon customizable"
      />
      <span
        v-if="externalLibrary"
        class="floating-diamond"
        aria-hidden="true"
      >
        <Icon
          :iconNode="diamond"
          fill="currentColor"
          :size="8"
        />
      </span>
    </span>

    <span class="icon-name">{{ name }}</span>

    <span
      v-if="deprecated"
      class="icon-flag deprecated"
      >deprecated</span
    >

    <span
      v-if="aliases?.length"
      class="icon-aliases"
      >{{ aliases.join(', ') }}</span
    >
  </a>
</template>

<style scoped>
.icon-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-decoration: none;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.icon-list-item:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.icon-list-item.active {
  border-color: var(--vp-c-brand);
}

.icon-preview {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.floating-diamond {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--vp-c-brand);
}

.icon-name {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
}

.icon-aliases {
  overflow: hidden;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-flag {
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
}

.icon-flag.deprecated {
  background-color: var(--vp-c-warning-soft, var(--vp-c-bg-elv));
  color: var(--vp-c-warning-1, var(--vp-c-text-2));
}

.lucide-icon {
  pointer-events: none;
}

.lucide-icon.customizable {
  width: 24px;
  height: 24px;
  color: var(--customize-color, currentColor);
  stroke-width: var(--customize-strokeWidth, 2);
}

html.absolute-stroke-width .lucide-icon.customizable {
  stroke-width: calc(var(--customize-strokeWidth, 2) * 24 / var(--customize-size, 24));
}
</style>
