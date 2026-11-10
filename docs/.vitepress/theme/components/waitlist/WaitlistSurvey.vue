<script setup lang="ts">
import { computed, ref } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Card from '../base/Card.vue';
import { iconFrequencies, type WaitlistProduct } from './products';
import './waitlist.css';

defineProps<{
  product: WaitlistProduct;
}>();

const expectations = ref('');
const topFeatures = ref<string[]>([]);
const iconFrequency = ref('');
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref('');

const hasAnswers = computed(
  () => expectations.value.trim() !== '' || topFeatures.value.length > 0 || iconFrequency.value,
);

async function onSubmit() {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch('/api/waitlist/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expectations: expectations.value.trim(),
        top_features: topFeatures.value,
        icon_frequency: iconFrequency.value,
      }),
    });

    if (response.ok) {
      isSubmitted.value = true;
      return;
    }

    errorMessage.value =
      response.status === 401
        ? "This session has expired, so we couldn't save your answers."
        : 'Something went wrong. Please try again.';
  } catch {
    errorMessage.value = 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Card
    v-if="isSubmitted"
    class="waitlist-card"
    role="status"
  >
    <div class="waitlist-card-header">
      <h2 class="waitlist-card-title">Thanks for sharing</h2>
      <p class="waitlist-card-description">
        Your answers help us decide what to build first. We'll be in touch.
      </p>
    </div>
  </Card>

  <Card
    v-else
    class="waitlist-card"
  >
    <div class="waitlist-card-header">
      <h2 class="waitlist-card-title">Help shape {{ product.name }}</h2>
      <p class="waitlist-card-description">Three optional questions. Answer as many as you like.</p>
    </div>

    <form
      class="waitlist-form"
      @submit.prevent="onSubmit"
    >
      <div class="waitlist-field">
        <label
          class="waitlist-label"
          for="survey-expectations"
          >{{ product.survey.expectationsLabel }}</label
        >
        <textarea
          id="survey-expectations"
          v-model="expectations"
          class="waitlist-input"
          name="expectations"
          maxlength="1000"
          rows="3"
        />
      </div>

      <fieldset class="waitlist-field">
        <legend class="waitlist-label">Which features matter most?</legend>
        <label
          v-for="feature in product.survey.features"
          :key="feature"
          class="choice"
        >
          <input
            v-model="topFeatures"
            type="checkbox"
            name="top_features"
            :value="feature"
          />
          {{ feature }}
        </label>
      </fieldset>

      <fieldset class="waitlist-field">
        <legend class="waitlist-label">How often do you add icons to a project?</legend>
        <label
          v-for="frequency in iconFrequencies"
          :key="frequency"
          class="choice"
        >
          <input
            v-model="iconFrequency"
            type="radio"
            name="icon_frequency"
            :value="frequency"
          />
          {{ frequency }}
        </label>
      </fieldset>

      <div class="waitlist-actions">
        <VPButton
          class="waitlist-button"
          type="submit"
          size="big"
          :text="isSubmitting ? 'Sending…' : 'Send answers'"
          :disabled="isSubmitting || !hasAnswers"
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
    </form>
  </Card>
</template>

<style scoped>
.choice {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.choice input {
  accent-color: var(--vp-c-brand-5);
}
</style>
