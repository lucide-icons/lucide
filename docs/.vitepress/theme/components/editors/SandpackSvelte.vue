<script lang="ts" setup>
import { type SandpackFiles } from 'sandpack-vue3';
import styledCSS from '../../sandpack-default.css?raw';
import Sandpack from './Sandpack.vue';

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
        hidden: true,
      },
      '/package.json': {
        hidden: true,
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
        hidden: true,
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
