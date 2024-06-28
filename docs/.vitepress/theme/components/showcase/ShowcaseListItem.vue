<script setup lang="ts">
import { useRouter } from 'vitepress';
import { ShowcaseItem } from "../../types";
import Card from '../base/Card.vue'

const { go } = useRouter()
defineProps<{
  showcaseItem: ShowcaseItem,
}>()
</script>

<template>
  <div>
    <Card
      class="company"
      :href="showcaseItem.url"
      :aria-label="showcaseItem.name"
    >
      <img
        :src="showcaseItem.image.light"
        class="logo light"
        :alt="`${showcaseItem.name} logo`"
      />
      <img
        :src="showcaseItem.image.dark"
        class="logo dark"
        :alt="`${showcaseItem.name} logo`"
      />
    </Card>
  </div>
</template>

<style scoped>
.company {
  display: flex;
  height: 100%;
  padding: 48px 0;
}

.logo {
  height:64px;
  width: 240px;
  margin: auto;
}

html.dark .logo.dark {
  display: none;
}
html:not(.dark) .logo.light {
  display: none;
}
</style>
