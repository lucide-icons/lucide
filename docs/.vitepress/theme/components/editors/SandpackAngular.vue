<script lang="ts" setup>
import { type SandpackFiles } from 'sandpack-vue3';
import styledCSS from '../../sandpack-default.css?raw';
import Sandpack from './Sandpack.vue';

const props = defineProps<{
  files: SandpackFiles;
}>();

const angularFiles = {
  '/src/index.html': {
    code: `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Angular</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="styles.css">
</head>

<body>
   <app></app>
</body>

</html>`,
    hidden: true,
  },
  '/src/app/app.component.css': {
    code: styledCSS,
    hidden: true,
  },
  '/src/polyfills.ts': {
    code: '',
    hidden: true,
  },
  '/src/app/app.config.ts': {
    code: `import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
`,
    hidden: true,
  },
  '/src/main.ts': {
    code: `import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

void bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));`,
    hidden: true,
  },
  '/package.json': {
    code: JSON.stringify({
      dependencies: {
        '@angular/common': '^21.0.0',
        '@angular/compiler': '^21.0.0',
        '@angular/core': '^21.0.0',
        '@angular/forms': '^21.0.0',
        '@angular/platform-browser': '^21.0.0',
        '@angular/router': '^21.0.0',
        'zone.js': '0.16.1',
        'core-js': '3.48.0',
        rxjs: '7.4.0',
      },
      main: '/src/main.ts',
      devDependencies: {
        '@angular/build': '^21.0.3',
        '@angular/cli': '^21.0.3',
        '@angular/compiler-cli': '^21.0.0',
      },
    }),
    hidden: true,
  },
};
</script>

<template>
  <Sandpack
    template="angular"
    :files="{
      ...angularFiles,
      ...props.files,
    }"
  />
</template>
