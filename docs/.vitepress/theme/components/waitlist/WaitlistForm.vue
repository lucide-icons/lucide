<script setup lang="ts">
import { ref } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Card from '../base/Card.vue';
import Input from '../base/Input.vue';
import { track } from '../../utils/openpanel';
import type { WaitlistProduct } from './products';
import './waitlist.css';

const props = defineProps<{
  product: WaitlistProduct;
}>();

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Enter a valid email address.',
  429: 'Too many attempts. Wait a minute and try again.',
};
const GENERIC_ERROR = 'Something went wrong. Please try again.';

const email = ref('');
const useCase = ref('');
const website = ref('');
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref('');
const hasEmailError = ref(false);

async function onSubmit() {
  isSubmitting.value = true;
  errorMessage.value = '';
  hasEmailError.value = false;

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim(),
        product: props.product.id,
        use_case: useCase.value.trim(),
        website: website.value,
      }),
    });

    if (response.ok) {
      track('waitlist_submit', { product: props.product.id });
      isSubmitted.value = true;
      return;
    }

    errorMessage.value = ERROR_MESSAGES[response.status] ?? GENERIC_ERROR;
    hasEmailError.value = response.status === 400;
  } catch {
    errorMessage.value = GENERIC_ERROR;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Card class="waitlist-card">
    <div
      v-if="isSubmitted"
      class="waitlist-card-header"
      role="status"
    >
      <h2 class="waitlist-card-title">Check your inbox</h2>
      <p class="waitlist-card-description">
        We sent a confirmation link to <strong>{{ email.trim() }}</strong
        >. Click it to join the waitlist for {{ product.name }}.
      </p>
    </div>

    <template v-else>
      <div class="waitlist-card-header">
        <h2 class="waitlist-card-title">Join the waitlist</h2>
        <p class="waitlist-card-description">{{ product.cardDescription }}</p>
      </div>

      <form
        class="waitlist-form"
        @submit.prevent="onSubmit"
      >
        <div class="waitlist-field">
          <label
            class="waitlist-label"
            for="waitlist-email"
            >Email</label
          >
          <Input
            id="waitlist-email"
            v-model="email"
            class="waitlist-input"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="you@example.com"
            required
            :aria-invalid="hasEmailError"
          />
        </div>

        <div class="waitlist-field">
          <label
            class="waitlist-label"
            for="waitlist-use-case"
          >
            {{ product.useCaseLabel }}
            <span class="waitlist-label-hint">(optional)</span>
          </label>
          <Input
            id="waitlist-use-case"
            v-model="useCase"
            class="waitlist-input"
            type="text"
            name="use_case"
            maxlength="200"
            autocomplete="off"
            :placeholder="product.useCasePlaceholder"
          />
        </div>

        <!-- Honeypot: people never see this field, so anything in it came from a bot. -->
        <div
          class="honeypot"
          aria-hidden="true"
        >
          <label>
            Website
            <input
              v-model="website"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
            />
          </label>
        </div>

        <div class="waitlist-actions">
          <VPButton
            class="waitlist-button"
            type="submit"
            size="big"
            :text="isSubmitting ? 'Joining…' : 'Join the waitlist'"
            :disabled="isSubmitting"
          />
          <div aria-live="polite">
            <p
              v-if="errorMessage"
              class="waitlist-error"
            >
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <p class="privacy-note">
          We store your email and answer to send you launch updates for {{ product.name }}.
          Unsubscribe anytime.
          <a
            class="waitlist-link"
            href="/privacy"
            >Privacy statement</a
          >
        </p>
      </form>
    </template>
  </Card>
</template>

<style scoped>
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.privacy-note {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}

.privacy-note .waitlist-link {
  font-weight: 400;
}

strong {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
