<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';
import { useData } from 'vitepress';
import Icon from '@lucide/vue/src/Icon.ts';
import { check } from '../../../data/iconNodes';

const { isDark } = useData();
</script>

<template>
  <ClientOnly>
    <Toaster
      position="bottom-center"
      :theme="isDark ? 'dark' : 'light'"

    >
      <template #success-icon>
        <Icon
          :iconNode="check"
          name="check"
          :size="24"
        />
      </template>
    </Toaster>
  </ClientOnly>
</template>

<style>
/* Same surface as base/Card.vue. The extra :root outranks sonner's per-theme rules */
:root [data-sonner-toaster][data-sonner-theme] {
  --normal-bg: var(--vp-c-bg-soft);
  --normal-border: var(--vp-c-divider);
  --normal-text: var(--vp-c-text-1);
  --border-radius: 12px;
}

/* Keep the icon and the text on one centred line; the site's line-height pushes the text down */
[data-sonner-toast] {
  align-items: center;
}

[data-sonner-toast] [data-icon] {
  align-self: center;
  margin-top: 0;
  margin-bottom: 0;
}

/* Sonner's icon box is 16px, so match the 24px check to stop it overflowing into the text */
[data-sonner-toast][data-styled='true'][data-type='success'] [data-icon] {
  width: 24px;
  height: 24px;
  color: var(--vp-c-success-1);
}

[data-sonner-toast] [data-content],
[data-sonner-toast] [data-title] {
  line-height: 20px;
}
</style>
