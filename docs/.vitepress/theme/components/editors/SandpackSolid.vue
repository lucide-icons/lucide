<script lang="ts" setup>
import { SandpackFiles, SANDBOX_TEMPLATES } from 'sandpack-vue3';
import Sandpack from './Sandpack.vue';

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
