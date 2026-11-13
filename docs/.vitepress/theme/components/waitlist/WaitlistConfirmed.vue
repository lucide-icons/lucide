<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '../base/Card.vue';
import WaitlistSurvey from './WaitlistSurvey.vue';
import { waitlistProducts, type WaitlistProduct } from './products';
import { track } from '../../utils/openpanel';
import './waitlist.css';

const status = ref<'pending' | 'confirmed' | 'invalid' | 'error'>('pending');
const product = ref<WaitlistProduct>();

// This page is prerendered, so the query string is only available after hydration.
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');

  product.value =
    productId && Object.hasOwn(waitlistProducts, productId)
      ? waitlistProducts[productId]
      : undefined;
  if (params.get('status') === 'error') {
    status.value = 'error';
  } else {
    status.value = product.value && !params.has('status') ? 'confirmed' : 'invalid';
  }

  if (status.value === 'confirmed' && product.value) {
    track('waitlist_confirmed', { product: product.value.id });
  }
});
</script>

<template>
  <section class="waitlist-confirmed">
    <Card
      v-if="status === 'confirmed' && product"
      class="waitlist-card"
      role="status"
    >
      <div class="waitlist-card-header">
        <h1 class="waitlist-card-title">You're on the waitlist</h1>
        <p class="waitlist-card-description">
          Thanks for confirming. We'll email you launch updates for {{ product.name }}.
        </p>
      </div>
    </Card>

    <WaitlistSurvey
      v-if="status === 'confirmed' && product"
      :product="product"
    />

    <Card
      v-if="status === 'error'"
      class="waitlist-card"
    >
      <div class="waitlist-card-header">
        <h1 class="waitlist-card-title">Something went wrong</h1>
        <p class="waitlist-card-description">
          We couldn't confirm your email just now. Click the link in the email again in a few
          minutes.
        </p>
      </div>
    </Card>

    <Card
      v-if="status === 'invalid'"
      class="waitlist-card"
    >
      <div class="waitlist-card-header">
        <h1 class="waitlist-card-title">This link has expired</h1>
        <p class="waitlist-card-description">
          Your confirmation link is invalid or too old.
          <a
            class="waitlist-link"
            :href="product?.path ?? '/mcp'"
            >Join the waitlist again</a
          >
          to get a new one.
        </p>
      </div>
    </Card>
  </section>
</template>

<style scoped>
.waitlist-confirmed {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 576px;
  min-height: calc(100vh - var(--vp-nav-height) - 113px);
  margin: 0 auto;
  padding: 80px 24px 64px;
}
</style>
