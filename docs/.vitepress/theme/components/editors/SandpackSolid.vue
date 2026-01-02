<script lang="ts" setup>
import { ComponentPropsOptions, type FunctionalComponent } from 'vue';
import { Sandpack, SandpackFiles, SANDBOX_TEMPLATES } from 'sandpack-vue3';

const props = defineProps<{
  files: SandpackFiles;
}>();
</script>

<template>
  <Sandpack
    template="vite-solid"
    :files="{
      ...props.files,
      ...SANDBOX_TEMPLATES['vite-solid'].files,
      '/package.json': {
        code: JSON.stringify(
          {
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'tsc && vite build',
              serve: 'vite preview',
            },
            dependencies: {
              'solid-js': '^1.7.5',
              'lucide-solid': 'latest',
            },
            devDependencies: {
              vite: '4.2.2',
              typescript: '^5.0.4',
              'vite-plugin-solid': '^2.7.0',
              'esbuild-wasm': '^0.17.19',
            },
            main: '/index.tsx',
          },
          null,
          2,
        ),
      },
    }"
  />
</template>

<style>
.sp-wrapper + * {
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
