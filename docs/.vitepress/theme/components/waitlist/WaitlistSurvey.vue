<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Card from '../base/Card.vue';
import type { WaitlistProduct } from './products';
import './waitlist.css';

const props = defineProps<{
  product: WaitlistProduct;
  contactId?: string;
  useCase?: string;
}>();

/** `contactId` and `use-case` fill the Tally form's hidden fields, so submissions can be linked to the signup. */
const embedSrc = computed(() => {
  const url = new URL(props.product.survey.embedSrc);
  if (props.contactId) url.searchParams.set('contactId', props.contactId);
  if (props.useCase) url.searchParams.set('use-case', props.useCase);
  return url.href;
});

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
  <Card class="waitlist-card survey-card">
    <iframe
      :data-tally-src="embedSrc"
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

<style scoped>
/* The Tally form has dark text on a transparent background, so it needs a light card in dark mode. */
html.dark div.waitlist-card.survey-card.card {
  background-color: #fff;
}
</style>
