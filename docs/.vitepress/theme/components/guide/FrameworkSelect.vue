<script setup lang="tsx">
import VPSidebarGroup from 'vitepress/dist/client/theme-default/components/VPSidebarGroup.vue';
import sidebar, { guideSidebarTop } from '../../../sidebar';
import { useData, useRouter } from 'vitepress';
import Select from '../base/Select.vue';
import { computed, ref, watch, watchEffect } from 'vue';
import { link, route } from '~/.vitepress/data/iconNodes';
import { useLocalStorage } from '@vueuse/core';

const { page } = useData();
const router = useRouter();

const frameworks = [
  { name: 'Vanilla', icon: '/framework-logos/js.svg', route: '/guide/lucide/' },
  { name: 'React', icon: '/framework-logos/react.svg', route: '/guide/react/' },
  { name: 'Vue', icon: '/framework-logos/vue.svg', route: '/guide/vue/' },
  { name: 'Svelte', icon: '/framework-logos/svelte.svg', route: '/guide/svelte/' },
  { name: 'Solid', icon: '/framework-logos/solid.svg', route: '/guide/solid/' },
  { name: 'Angular', icon: '/framework-logos/angular.svg', route: '/guide/angular/' },
  { name: 'Preact', icon: '/framework-logos/preact.svg', route: '/guide/preact/' },
  {
    name: 'React Native',
    icon: '/framework-logos/react-native.svg',
    route: '/guide/react-native/',
  },
  { name: 'Astro', icon: '/framework-logos/astro-dark.svg', route: '/guide/astro/' },
];

const fallbackFramework = useLocalStorage('lucide-docs-fallback-framework', frameworks[1]);

const selected = computed(() => {
  const current = frameworks.find(({ route }) => {
    if (router.route.path?.startsWith?.('/guide')) {
      const [, , framework] = router.route.path.split('/');
      const [, frameWorkRoute] = route.split('/').filter(Boolean);

      return framework === frameWorkRoute;
    }
    return router.route.path.split('/').slice(0, 3).join('/') === route;
  });

  return current || fallbackFramework.value;
});

function onSelectFramework(item: { name: string; icon: string; route: string }) {
  fallbackFramework.value = item;
  if (item.route !== router.route.path) {
    const likeRoute = router.route.path.replace(selected.value.route, item.route);

    console.log(likeRoute);

    const hasRoute = sidebar[item.route]?.some((section) =>
      section?.items?.some(({ link }) => link === likeRoute),
    );

    if (hasRoute) {
      router.go(likeRoute);
      return;
    }

    router.go(item.route);
  }
}
</script>

<template>
  <VPSidebarGroup
    :items="guideSidebarTop"
    v-if="page?.relativePath?.startsWith?.('guide')"
  />
  <div
    class="framework-select"
    v-if="page?.relativePath?.startsWith?.('guide')"
  >
    <label for="framework-select">Framework</label>
    <Select
      id="framework-select"
      :items="frameworks"
      @update:model-value="onSelectFramework"
      v-model="selected"
    />
  </div>
  <VPSidebarGroup
    :key="selected.route"
    v-if="
      page?.relativePath?.startsWith?.('guide') &&
      !page?.relativePath?.startsWith?.(selected.route.substring(1))
    "
    :items="sidebar[selected.route]"
  />
</template>

<style scoped>
.framework-select {
  font-size: 12px;
  transition:
    border-color 0.5s,
    background-color 0.5s ease;
  margin-bottom: 10px;
  position: sticky;
  top: -0.5px;
  z-index: 10;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
  margin-top: -10px;
}

label {
  color: var(--vp-c-text-1);
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
}
</style>
