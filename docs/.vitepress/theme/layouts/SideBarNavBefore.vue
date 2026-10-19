<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import VPSidebarGroup from 'vitepress/dist/client/theme-default/components/VPSidebarGroup.vue';
import FrameworkSelect from '../components/guide/FrameworkSelect.vue';
import { guideSidebarTop } from '../../sidebar';

const { page } = useData();

const isGuide = computed(() => page.value?.relativePath?.startsWith?.('guide'));
</script>

<template>
  <template v-if="isGuide">
    <VPSidebarGroup :items="guideSidebarTop" />
    <FrameworkSelect />
  </template>
</template>
