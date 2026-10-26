<script setup lang="ts">
import { useRouter } from 'vitepress';
import Badge from '../base/Badge.vue';
import HomeContainer from './HomeContainer.vue';
import { data } from './HomeHeroIconsCard.data';
import FakeInput from '../base/FakeInput.vue';
import { nextTick, provide } from 'vue';
import useSearchShortcut from '../../utils/useSearchShortcut';
import useScrollDepthTracking from '../../composables/useScrollDepthTracking';
import { track } from '../../utils/openpanel';

const { go } = useRouter();

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  track('home_search_click', { via: 'shortcut' });
  go('/icons/?focus');
});

useScrollDepthTracking('home_scroll_depth');

function onSearchClick() {
  track('home_search_click', { via: 'click' });
  go('/icons/?focus');
}

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

async function handleClick(event: MouseEvent) {
  if (!enableTransitions()) {
    go('/icons/?focus');
    return;
  }

  await document.startViewTransition(async () => {
    await go('/icons/?focus');
    await nextTick();
  }).ready;
}
</script>
<template>
  <FakeInput
    @click="onSearchClick"
    :shortcut="kbdSearchShortcut"
    class="search-box"
  >
    Search {{ data.iconsCount }} icons...
  </FakeInput>
</template>

<style scoped>
.search-box {
  view-transition-name: icons-search-box;
  width: 100%;
  margin-top: 24px;
}
</style>
