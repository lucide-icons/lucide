<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';
import { useData } from 'vitepress';

const { isDark } = useData();
</script>

<template>
  <ClientOnly>
    <Toaster
      position="bottom-center"
      :theme="isDark ? 'dark' : 'light'"
    />
  </ClientOnly>
</template>

<style>
/* Keep the icon and the text on one centred line; the site's line-height pushes the text down */
[data-sonner-toast] {
  align-items: center;
}

[data-sonner-toast] [data-icon] {
  align-self: center;
  margin-top: 0;
  margin-bottom: 0;
}

[data-sonner-toast] [data-content],
[data-sonner-toast] [data-title] {
  line-height: 20px;
}
</style>
