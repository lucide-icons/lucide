<script setup lang="ts">
import { onMounted } from 'vue';
import Card from '../base/Card.vue';
import type { WaitlistProduct } from './products';
import './waitlist.css';

defineProps<{
  product: WaitlistProduct;
}>();

/** Without Tally's script the embed still works, it just doesn't resize to its content. */
function loadEmbeds() {
  if (window.Tally) {
    window.Tally.loadEmbeds();
    return;
  }

  document
    .querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])')
    .forEach((iframe) => {
      iframe.src = iframe.dataset.tallySrc ?? '';
    });
}

onMounted(() => {
  if (window.Tally) {
    loadEmbeds();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.onload = loadEmbeds;
  script.onerror = loadEmbeds;
  document.body.appendChild(script);
});
</script>

<template>
  <Card class="waitlist-card">
    <iframe
      :data-tally-src="product.survey.embedSrc"
      loading="lazy"
      width="100%"
      height="857"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      :title="product.survey.title"
    />
  </Card>
</template>
