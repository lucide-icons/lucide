<script lang="ts" setup>
import { ComponentPropsOptions, type FunctionalComponent } from 'vue';
import { SandpackFiles, SANDBOX_TEMPLATES } from 'sandpack-vue3';
import Sandpack from './Sandpack.vue';
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
        hidden: true,
      },
    }"
  />
</template>
