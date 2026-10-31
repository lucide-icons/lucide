<script setup lang="ts">
import { computed } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Icon from '@lucide/vue/src/Icon';
import { check } from '../../../data/iconNodes';
import { formatEuro, getPreviousTier, getTierLinks, type Tier } from './tiers';

const props = defineProps<{
  tier: Tier;
}>();

const previousTier = computed(() => getPreviousTier(props.tier.id));
const links = computed(() => getTierLinks(props.tier));
</script>

<template>
  <article class="tier-card">
    <div class="header">
      <h3 class="name">{{ tier.name }}</h3>
      <div class="price">
        <span class="amount">{{ formatEuro(tier.monthly) }}</span>
        <span class="period">/ month</span>
      </div>
      <span
        v-if="tier.yearly"
        class="yearly"
      >
        or {{ formatEuro(tier.yearly) }} / year, two months free
      </span>
    </div>

    <ul class="perks">
      <li
        v-if="previousTier"
        class="inherited"
      >
        Everything in {{ previousTier.name }}, plus
      </li>
      <li
        v-for="perk in tier.perks"
        :key="perk"
        class="perk"
      >
        <Icon
          :iconNode="check"
          name="check"
          :size="18"
          class="perk-icon"
          aria-hidden="true"
        />
        {{ perk }}
      </li>
    </ul>

    <div class="actions">
      <VPButton
        :href="links.openCollective"
        text="Open Collective"
        :theme="tier.featured ? 'brand' : 'alt'"
        class="primary-action"
      />
      <a
        :href="links.githubSponsors"
        target="_blank"
        rel="noreferrer"
        class="secondary-action"
      >
        GitHub Sponsors
      </a>
    </div>
  </article>
</template>

<style scoped>
.tier-card {
  flex: 0 0 300px;
  scroll-snap-align: start;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.25s;
}

.tier-card:last-child {
  scroll-snap-align: end;
}

.tier-card:hover,
.tier-card:focus-within {
  border-color: var(--vp-c-brand-3);
}

.header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.amount {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.period,
.yearly {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.yearly {
  font-size: 13px;
}

.perks {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-1);
}

.inherited {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.perk {
  display: flex;
  gap: 8px;
}

.perk-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--sponsor-accent);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.primary-action {
  display: block;
}

.secondary-action {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: var(--sponsor-accent);
  text-decoration: none;
}

.secondary-action:hover {
  text-decoration: underline;
}
</style>
