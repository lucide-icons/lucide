<script setup lang="ts">
import { useData } from 'vitepress';
import { useSessionStorage } from '@vueuse/core';
import IconButton from '../base/IconButton.vue';
import VPDocAsideCarbonAds from 'vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue';
import { x } from '../../../data/iconNodes';
import Icon from 'lucide-vue-next/src/Icon';
import { onMounted } from 'vue';

const { theme } = useData();
const showAd = useSessionStorage('show-carbon-ads', true);

defineProps<{
  drawerOpen: boolean;
}>();

onMounted(() => {
  setTimeout(() => {
    if (window?._carbonads == null) {
      showAd.value = false;
    }
  }, 5000);
});

function handleHideAd() {
  console.log('CLOSE');

  showAd.value = false;
}
</script>

<template>
  <div
    :class="{
      'drawer-open': drawerOpen,
      'hide-ad': !showAd,
    }"
    class="floating-ad"
    v-if="theme.carbonAds"
  >
    <IconButton
      @click="handleHideAd"
      class="hide-button"
    >
      <Icon
        :iconNode="x"
        :size="20"
        absoluteStrokeWidth
      />
    </IconButton>
    <VPDocAsideCarbonAds :carbon-ads="theme.carbonAds" />
  </div>
</template>

<style scoped>
.floating-ad {
  position: fixed;
  bottom: 32px;
  width: 224px;
  right: 32px;
  transition:
    opacity 0.5s,
    transform 0.25s ease;
}

.floating-ad.drawer-open {
  transform: translateY(-288px);
}

.floating-ad.hide-ad {
  transform: translateX(224px);
  opacity: 0;
}

.floating-ad.drawer-open.hide-ad {
  transform: translateY(-288px) translateX(224px);
}

.floating-ad.drawer-open,
.floating-ad.hide-ad {
  transition:
    opacity 0.25s,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.hide-button {
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
}
</style>
