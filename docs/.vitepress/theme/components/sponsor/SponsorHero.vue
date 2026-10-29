<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import SponsorSection from './SponsorSection.vue';
import { data } from './SponsorStats.data';
import { sponsors } from './sponsors';

const stats = [
  ...(data.stars != null
    ? [{ value: `${Math.floor(data.stars / 1000)}k+`, label: 'GitHub stars' }]
    : []),
  {
    value: `${(Math.floor(data.iconsCount / 100) * 100).toLocaleString('en-US')}+`,
    label: 'Icons',
  },
  { value: sponsors.length.toLocaleString('en-US'), label: 'Sponsors' },
];
</script>

<template>
  <SponsorSection class="hero">
    <div class="hero-content">
      <div class="intro">
        <h1 class="title">Sponsor <span class="name">Lucide</span></h1>
        <p class="lead">
          Lucide is built and maintained by a small team and a big community. Your sponsorship pays
          for icon reviews, new packages and the hours that keep every release dependable.
        </p>
        <div class="actions">
          <VPButton
            href="#tiers"
            text="Become a sponsor"
            size="big"
          />
          <VPButton
            href="#sponsors"
            text="See our sponsors"
            size="big"
            theme="alt"
          />
        </div>
      </div>

      <dl class="stats">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat"
        >
          <dt class="stat-label">{{ stat.label }}</dt>
          <dd class="stat-value">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </SponsorSection>
</template>

<style scoped>
.hero {
  padding-top: 96px;
}

.hero-content {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-items: center;
}

.intro {
  flex: 999 1 520px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  margin: 0;
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.name {
  color: var(--vp-c-brand-3);
}

.lead {
  margin: 0;
  max-width: 560px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stats {
  flex: 1 1 340px;
  min-width: 0;
  margin: 0;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  order: -1;
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.stat-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

@media (min-width: 768px) {
  .title {
    font-size: 56px;
    line-height: 64px;
  }

  .stat-value {
    font-size: 28px;
    line-height: 36px;
  }
}
</style>
