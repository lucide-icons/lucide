<script lang="ts" setup>
import { ComponentPropsOptions, type FunctionalComponent } from 'vue';
import { Sandpack, SandpackFiles, SANDBOX_TEMPLATES } from 'sandpack-vue3';
import styledCSS from '../../sandpack-default.css?raw';

const props = defineProps<{
  files: SandpackFiles;
}>();
</script>

<template>
  <Sandpack
    template="vite-svelte"
    :files="{
      ...props.files,
      '/src/styles.css': {
        code: styledCSS,
      },
      '/package.json': {
        code: JSON.stringify(
          {
            type: 'module',
            scripts: {
              dev: 'vite',
            },
            dependencies: {
              svelte: '^4.2.19',
              'lucide-svelte': 'latest',
            },
            devDependencies: {
              '@sveltejs/vite-plugin-svelte': '2.1.1',
              vite: '4.2.2',
              'esbuild-wasm': '^0.17.19',
            },
          },
          null,
          2,
        ),
      },
      '/vite.config.js': {
        code: `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@lucide/svelte': 'lucide-svelte',
    },
  },
})`,
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
