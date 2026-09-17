<script setup lang="ts">
import { IconEntity } from '../../types';
import IconDetailName from './IconDetailName.vue';
import Badge from '../base/Badge.vue';
import CopySVGButton from './CopySVGButton.vue';
import CopyCodeButton from './CopyCodeButton.vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import { diamond } from '../../../data/iconNodes';
import deprecationReasonTemplate from '../../../../../tools/build-icons/utils/deprecationReasonTemplate.ts';
import IconTags from "./IconTags.vue"
import getStudioLink from '../../utils/getStudioLink';

const props = defineProps<{
  icon: IconEntity;
  popoverPosition?: 'top' | 'bottom';
  showEditButton?: boolean;
}>();

const { go } = useRouter();
const { page } = useData();

const DiamondIcon = createLucideIcon('Diamond', diamond);

const deprecatedTitle = computed(() => {
  if (!props.icon.deprecationReason) return '';
  return deprecationReasonTemplate(props.icon.deprecationReason, {
    componentName: props.icon.name,
    iconName: props.icon.name,
    toBeRemovedInVersion: props.icon.toBeRemovedInVersion,
  });
});

const iconPath = computed(() => {
  if (props.icon.externalLibrary) {
    return `icons/${props.icon.externalLibrary}/${props.icon.name}`;
  }

  return `icons/${props.icon.name}`;
});
</script>

<template>
  <div class="icon-info">
    <div class="icon-name-wrapper">
      <IconDetailName class="icon-name">
        {{ icon.name }}
      </IconDetailName>
      <div
        v-if="icon.externalLibrary"
        class="icon-external-lib"
      >
        <DiamondIcon
          fill="currentColor"
          :size="12"
        />
        {{ icon.externalLibrary }}
      </div>
      <Badge
        v-if="icon.deprecated"
        class="deprecated-badge"
        :title="deprecatedTitle"
      >
        Deprecated
      </Badge>
    </div>
    <IconTags :tags="props.icon.tags" />
    <div class="group">
      <Badge
        v-for="category in icon.categories"
        class="category"
        :href="`/icons/categories#${category}`"
      >
        {{ category }}
      </Badge>
    </div>

    <div class="group buttons">
      <VPButton
        v-if="!page?.relativePath?.startsWith?.(iconPath)"
        :href="iconPath"
        text="See in action"
        @click="go(iconPath)"
      />
      <CopySVGButton
        :name="icon.name"
        :popoverPosition="popoverPosition"
      />
      <CopyCodeButton
        :name="icon.name"
        :popoverPosition="popoverPosition"
      />
      <a
        v-if="showEditButton"
        class="studio-edit-button"
        :href="getStudioLink(icon.name, icon.iconNode, 'icon-info')"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SquarePenIcon :size="14" />
        <span>Edit in studio</span>
      </a>
    </div>
    <slot name="footer" />
  </div>
</template>

<style scoped>
.studio-edit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  min-height: 40px;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 999px;
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s,
    transform 0.2s;
  margin-left: 0;
  margin-inline-start: 0;
}

.studio-edit-button:hover,
.studio-edit-button:focus-visible {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
  transform: translateY(-1px);
}

.group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.category {
  text-transform: capitalize;
}
.icon-name {
  margin-right: -36px;
}

.icon-name-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 4px;
}

.icon-external-lib {
  color: var(--vp-c-brand-dark);
  padding: 4px 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.deprecated-badge {
  background-color: var(--vp-c-brand-5);
  margin-left: 40px;
  opacity: 0.8;
}

.deprecated-badge:hover {
  background-color: var(--vp-c-brand-2);
}

.buttons {
  margin-top: 24px;
}
</style>
