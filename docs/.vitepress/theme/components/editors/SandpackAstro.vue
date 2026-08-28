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
    template="astro"
    :files="{
      ...props.files,
      '/src/styles.css': {
        code: styledCSS,
        hidden: true,
      },
    }"
  />
</template>
