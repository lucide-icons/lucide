<script setup lang="ts">
import { useRouter } from 'vitepress';
import Badge from '../base/Badge.vue';
import HomeContainer from './HomeContainer.vue';
import { data } from './HomeHeroBefore.data'
import FakeInput from '../base/FakeInput.vue'

const { go } = useRouter()

function handleClick() {
  if (!document.startViewTransition) {
    go('/icons/?focus')
    return;
  }
  document.startViewTransition(() => go('/icons/?focus'));
}
</script>
<template>
  <FakeInput @click="handleClick" class="search-box">
    Search {{ data.iconsCount }} icons...
  </FakeInput>
</template>

<style scoped>
.search-box {
  /* width: calc(100vw - 272px); */
  view-transition-name: icons-search-box;
  width: 100%;
  margin-top: 24px;
}

</style>
