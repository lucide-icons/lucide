<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import MotionCounter from '../base/MotionCounter.vue';
import SponsorSection from './SponsorSection.vue';
import SponsorHeroAnimation from './SponsorHeroAnimation.vue';
import { data } from './SponsorStats.data';
import { allTimeSponsorCount } from './sponsors';

/** Rounds down to a short "120M+" / "25k+" figure, split so the counter only counts the number. */
function toCompact(value: number) {
  if (value >= 1_000_000) return { value: Math.floor(value / 1_000_000), suffix: 'M+' };
  if (value >= 1_000) return { value: Math.floor(value / 1_000), suffix: 'k+' };
  return { value, suffix: '' };
}

const stats = [
  { value: data.weeklyDownloads, label: 'Weekly downloads', format: toCompact },
  { value: data.stars, label: 'GitHub stars', format: toCompact },
  {
    value: data.iconsCount,
    label: 'Icons',
    format: (value: number) => ({ value: Math.floor(value / 100) * 100, suffix: '+' }),
  },
  {
    value: allTimeSponsorCount,
    label: 'All-time sponsors',
    format: (value: number) => ({ value, suffix: '' }),
  },
]
  // Stats the build couldn't fetch are left out.
  .filter((stat): stat is typeof stat & { value: number } => stat.value != null)
  .map(({ value, label, format }) => ({ ...format(value), label }));
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

        <dl class="stats">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat"
          >
            <dt class="stat-label">{{ stat.label }}</dt>
            <dd class="stat-value">
              <MotionCounter
                :value="stat.value"
                :suffix="stat.suffix"
                :delay="0.5 +(index * 0.1)"
              />
            </dd>
          </div>
        </dl>
      </div>

      <SponsorHeroAnimation class="hero-animation" />
    </div>
  </SponsorSection>
</template>

<style scoped>
.hero {
  padding-top: 48px;
}

.hero-content {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-items: center;
  flex-direction: column-reverse;

}

.intro {
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
  max-width: 560px;
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 16px;
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

.hero-animation {
  display: block;
  flex: 1 1 340px;
  min-width: 0;
  width: 100%;
  margin: 0 -24px;
}

@media (min-width: 640px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .hero {
  padding-top: 96px;
}
  .title {
    font-size: 56px;
    line-height: 64px;
  }

  .stat-value {
    font-size: 28px;
    line-height: 36px;
  }
}

@media (min-width: 960px) {
  .hero-content {
    flex-direction: row;
  }
}
</style>
