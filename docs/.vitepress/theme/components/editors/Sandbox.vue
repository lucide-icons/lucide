<script setup lang="ts">
import { getSandpackFiles, getCustomSetupFromProps, parsedBoolean, getSandpackOptions } from 'vitepress-plugin-sandpack';
import { Sandpack, type SandpackFiles } from 'sandpack-vue3';
import { computed, nextTick, onBeforeMount, onMounted, ref, useSlots, watch } from 'vue';
import styles from './styles.css?raw'

import sandpackTheme from '../../sandpackTheme.json'
import { sandboxProps } from 'vitepress-plugin-sandpack';

const props = defineProps({
  ...sandboxProps,
  editorHeight: {
    type: [String, Number],
    default: undefined
  },
  editorWidthPercentage: {
    type: [String, Number],
    default: undefined
  },
  dependencies: {
    type: String,
    default: undefined
  }
});

const files = ref<SandpackFiles>({});

const getOpt = (propName: string) => props[propName] ?? props?.options?.[propName];

const editorVisible = computed(() => parsedBoolean(getOpt('hideEditor')) ? 'none' : 'flex');

const previewHeight = computed(() => isNaN(Number(getOpt('previewHeight'))) ? undefined : Number(getOpt('previewHeight')));
const previewHeightStyle =
  computed(() => previewHeight.value ? `${previewHeight.value}px` : 'var(--sp-layout-height)');

const coderHeight = computed(() => isNaN(Number(getOpt('coderHeight'))) ? undefined : Number(getOpt('coderHeight')));
const coderHeightStyle =
  computed(() => coderHeight.value ? `${coderHeight.value}px` : 'var(--sp-layout-height)');

const slots = useSlots();
const isDark = ref(false);

const resolveFiles = async () => {
  files.value = {
    ...await getSandpackFiles(props, slots),
    'styles.css': {
      code: styles,
      hidden: true
    },
  };
};

watch(props, resolveFiles);

onBeforeMount(resolveFiles);

const dependencies = computed(() => {
  if (props.dependencies) {
    return props.dependencies.split(',').reduce((acc, dep) => {
      const [name, version] = dep.split(':').map(s => s.trim());
      acc[name] = version || 'latest';
      return acc;
    }, {} as Record<string, string>);
  }
  return undefined;
})
</script>

<template>
  <Sandpack :theme="sandpackTheme" :template="template" :rtl="parsedBoolean(rtl)" :files="files" :options="{
    ...(getSandpackOptions(props) as any),
    editorWidthPercentage: getOpt('editorWidthPercentage') ? Number(getOpt('editorWidthPercentage')) : undefined,
    showConsoleButton: false,
  }" :customSetup='{
    dependencies: dependencies
  }' />
</template>

<style>
.sp-wrapper+* {
  margin-top: 24px;
}

.sp-wrapper .sp-layout {
  border-radius: 8px;
}

.sp-wrapper .sp-tabs-scrollable-container {
  border-radius: 8px 8px 0 0;
  position: relative;

  box-shadow: inset 0 -1px var(--vp-code-tab-divider);
  margin-bottom: 0px;
  margin-top: -1px;
  height: 48px;
  padding-bottom: 1px;
}

.sp-wrapper .sp-preview-container {
  background-color: transparent;
}

.sp-wrapper .sp-tabs .sp-tab-button {
  padding: 0 12px;
  line-height: 48px;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.sp-wrapper .sp-tabs .sp-tab-button:after {
  position: absolute;
  right: 8px;
  left: 8px;
  bottom: 0px;
  z-index: 1;
  height: 1px;
  content: '';
  background-color: transparent;
  transition: background-color 0.25s;
}

.sp-wrapper .sp-tabs .sp-tab-button[data-active='true'] {
  color: var(--vp-code-tab-active-text-color);
}

.sp-wrapper .sp-tabs .sp-tab-button[data-active='true']:after {
  background-color: var(--vp-code-tab-active-bar-color);
}

.sp-wrapper .sp-button {
  color: var(--sp-colors-clickable);
  text-decoration: none;
}
</style>
