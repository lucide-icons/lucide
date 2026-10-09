<script lang="ts" setup>
import { SandpackFiles } from 'sandpack-vue3';
import { preactFiles } from './preact/files';
import Sandpack from './Sandpack.vue';

const props = defineProps<{
  files: SandpackFiles;
}>();
</script>

<template>
  <Sandpack
    template="vanilla"
    :files="{
      ...props.files,
      ...preactFiles,
    }"
  />
</template>
