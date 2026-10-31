<script setup lang="ts">
import { computed, ref } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Icon from '@lucide/vue/src/Icon';
import { check } from '../../../data/iconNodes';
import SponsorSection from './SponsorSection.vue';
import SponsorSectionHeader from './SponsorSectionHeader.vue';
import {
  TIERS,
  formatEuro,
  getAmountLinks,
  getPreviousTier,
  getTierForAmount,
  getTierLinks,
  type Frequency,
} from './tiers';

const frequencies: { id: Frequency; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'once', label: 'One-time' },
];

const frequency = ref<Frequency>('monthly');
const amount = ref(20);
// `v-model` on a number input casts to a number, an empty field stays ''.
const customAmount = ref<number | ''>('');

const isMonthly = computed(() => frequency.value === 'monthly');

const total = computed(() => {
  const value = customAmount.value === '' ? amount.value : Number(customAmount.value);

  return value > 0 ? value : 0;
});

const tier = computed(() => (isMonthly.value ? getTierForAmount(total.value) : null));

// A monthly preset opens its tier's checkout, other amounts open a checkout prefilled with
// the amount. The platforms expect whole amounts, so decimals are rounded.
const links = computed(() => {
  const value = Math.round(total.value);

  if (customAmount.value === '' && tier.value) return getTierLinks(tier.value);
  if (value > 0) return getAmountLinks(value, frequency.value);

  return getTierLinks();
});

const amountText = computed(() => formatEuro(total.value));

const summary = computed(() => {
  if (total.value === 0) {
    return { title: 'Choose an amount', perks: 'Pick a preset or enter your own.' };
  }
  if (!isMonthly.value) {
    return {
      title: `${amountText.value} one-time`,
      perks: 'A one-time thank-you. Tier perks apply to monthly sponsorships.',
    };
  }
  if (tier.value) {
    return {
      title: `${amountText.value} / month · ${tier.value.name}`,
      perks: tier.value.summary,
    };
  }
  return { title: `${amountText.value} / month`, perks: 'Every bit helps. Thank you!' };
});

const perksPanel = computed(() => {
  if (tier.value) {
    const previousTier = getPreviousTier(tier.value.id);

    return {
      title: tier.value.name,
      subtitle: `From ${formatEuro(tier.value.monthly)} / month`,
      perks: [
        ...(previousTier ? [{ text: `Everything in ${previousTier.name}`, inherited: true }] : []),
        ...tier.value.perks.map((text) => ({ text, inherited: false })),
      ],
      message: '',
    };
  }
  if (!isMonthly.value) {
    return {
      title: 'One-time gift',
      subtitle: total.value > 0 ? `${amountText.value}, once` : 'Any amount',
      perks: [],
      message:
        'Thank you! Tier perks come with monthly sponsorships. Switch to Monthly to see what you would get.',
    };
  }
  return {
    title: 'No tier yet',
    subtitle: total.value > 0 ? `${amountText.value} / month` : 'Choose an amount',
    perks: [],
    message: `Every bit helps. From ${formatEuro(TIERS[0].monthly)} a month you become a ${TIERS[0].name}.`,
  };
});

const isSelected = (value: number) => customAmount.value === '' && amount.value === value;

function pickAmount(value: number) {
  amount.value = value;
  customAmount.value = '';
}
</script>

<template>
  <SponsorSection band>
    <SponsorSectionHeader
      title="Choose your support"
      description="Pick an amount, monthly or one-time. Monthly amounts map to a sponsor tier with its own perks. Lucide stays free and open source either way."
    />

    <div class="layout">
      <div class="card picker">
        <div
          role="group"
          aria-label="Frequency"
          class="frequency"
        >
          <button
            v-for="option in frequencies"
            :key="option.id"
            type="button"
            class="frequency-option"
            :class="{ active: frequency === option.id }"
            :aria-pressed="frequency === option.id"
            @click="frequency = option.id"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="amounts">
          <button
            v-for="option in TIERS"
            :key="option.id"
            type="button"
            class="amount"
            :class="{ selected: isSelected(option.monthly) }"
            :aria-pressed="isSelected(option.monthly)"
            @click="pickAmount(option.monthly)"
          >
            <span class="amount-value">{{ formatEuro(option.monthly) }}</span>
            <span class="amount-label">{{ isMonthly ? option.name : 'One-time' }}</span>
          </button>
          <label
            class="amount custom"
            :class="{ selected: customAmount !== '' }"
          >
            <span class="amount-label">Custom (€)</span>
            <input
              v-model="customAmount"
              type="number"
              min="1"
              inputmode="numeric"
              placeholder="Other"
              class="amount-value custom-input"
            />
          </label>
        </div>

        <div class="summary">
          <div class="summary-text">
            <span class="summary-title">{{ summary.title }}</span>
            <span class="summary-perks">{{ summary.perks }}</span>
          </div>
          <div class="summary-actions">
            <VPButton
              :href="links.openCollective"
              text="Open Collective"
            />
            <VPButton
              :href="links.githubSponsors"
              text="GitHub Sponsors"
              theme="alt"
            />
          </div>
        </div>
      </div>

      <aside
        class="card perks"
        aria-live="polite"
      >
        <div class="perks-header">
          <span class="eyebrow">Your perks</span>
          <h3 class="perks-title">{{ perksPanel.title }}</h3>
          <span class="perks-subtitle">{{ perksPanel.subtitle }}</span>
        </div>
        <ul
          v-if="perksPanel.perks.length"
          class="perks-list"
        >
          <li
            v-for="perk in perksPanel.perks"
            :key="perk.text"
            class="perk"
            :class="{ inherited: perk.inherited }"
          >
            <Icon
              :iconNode="check"
              name="check"
              :size="18"
              class="perk-icon"
              aria-hidden="true"
            />
            {{ perk.text }}
          </li>
        </ul>
        <p
          v-else
          class="perks-message"
        >
          {{ perksPanel.message }}
        </p>
        <a
          href="#tiers"
          class="compare"
        >
          Compare all tiers
        </a>
      </aside>
    </div>
  </SponsorSection>
</template>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: stretch;
}

.card {
  min-width: 0;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.picker {
  flex: 999 1 520px;
}

.frequency {
  display: inline-flex;
  align-self: flex-start;
  padding: 4px;
  gap: 4px;
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.frequency-option {
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.frequency-option.active {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-1);
}

.amounts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.amount {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
  min-height: 72px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.25s,
    background-color 0.25s;
}

.amount:hover {
  border-color: var(--vp-c-border);
}

.amount.selected {
  border-color: var(--sponsor-accent);
  background-color: rgba(245, 101, 101, 0.08);
}

.amount-value {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.amount-label {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.custom {
  cursor: text;
}

.custom-input {
  width: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
}

.custom:focus-within {
  border-color: var(--sponsor-accent);
}

.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.summary-text {
  flex: 1 1 280px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.summary-perks {
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.summary-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.perks {
  flex: 1 1 300px;
  gap: 20px;
}

.perks-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.perks-title {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.perks-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.perks-list {
  margin: 0;
  padding: 16px 0 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  line-height: 22px;
  border-top: 1px solid var(--vp-c-divider);
}

.perk {
  display: flex;
  gap: 10px;
  color: var(--vp-c-text-1);
}

.perk.inherited {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.perk-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--sponsor-accent);
}

.perks-message {
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.compare {
  margin-top: auto;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--sponsor-accent);
  text-decoration: none;
}

.compare:hover {
  text-decoration: underline;
}
</style>
