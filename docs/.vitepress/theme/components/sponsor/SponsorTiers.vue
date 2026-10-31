<script setup lang="ts">
import { ref } from 'vue';
import { useScroll } from '@vueuse/core';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Icon from '@lucide/vue/src/Icon';
import { chevronLeft, chevronRight } from '../../../data/iconNodes';
import SponsorSection from './SponsorSection.vue';
import SponsorSectionHeader from './SponsorSectionHeader.vue';
import SponsorTierCard from './SponsorTierCard.vue';
import { PARTNER_EMAIL, TIERS } from './tiers';

// Card width plus the gap between cards.
const SCROLL_STEP = 316;

const track = ref<HTMLElement | null>(null);
const { arrivedState } = useScroll(track);

function scrollTrack(direction: 1 | -1) {
  track.value?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' });
}
</script>

<template>
  <SponsorSection
    id="tiers"
    class="tiers"
  >
    <div class="tiers-header">
      <SponsorSectionHeader
        title="Sponsor tiers"
        description="Two tiers for individuals, three for companies. Each step adds one clear placement, and perks stack as you go up. Same tiers on Open Collective (EUR) and GitHub Sponsors (USD)."
        class="tiers-title"
      />
      <div class="track-controls">
        <button
          type="button"
          class="track-button"
          aria-label="Previous tiers"
          :disabled="arrivedState.left"
          @click="scrollTrack(-1)"
        >
          <Icon
            :iconNode="chevronLeft"
            name="chevron-left"
            :size="20"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          class="track-button"
          aria-label="Next tiers"
          :disabled="arrivedState.right"
          @click="scrollTrack(1)"
        >
          <Icon
            :iconNode="chevronRight"
            name="chevron-right"
            :size="20"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <div class="track-wrapper">
      <div
        ref="track"
        class="track"
        role="region"
        aria-label="Sponsor tiers"
        tabindex="0"
      >
        <SponsorTierCard
          v-for="tier in TIERS"
          :key="tier.id"
          :tier="tier"
        />
      </div>
      <div
        class="fade fade-left"
        :class="{ visible: !arrivedState.left }"
        aria-hidden="true"
      />
      <div
        class="fade fade-right"
        :class="{ visible: !arrivedState.right }"
        aria-hidden="true"
      />
    </div>

    <div class="partner">
      <div class="partner-text">
        <h3 class="partner-title">Partner? Let's talk.</h3>
        <p class="partner-description">
          One partner at a time, custom amount. An exclusive "Supported by" slot, your logo in
          release posts, an annual roadmap call and priority review of your icon PRs.
        </p>
      </div>
      <VPButton
        :href="`mailto:${PARTNER_EMAIL}`"
        text="Contact us"
        theme="alt"
        target="_self"
      />
    </div>

    <p class="disclaimer">
      Sponsors never buy icon acceptance or design influence. Every icon meets the same guidelines
      and community review. Paying by invoice through GitHub Sponsors avoids part of GitHub's
      organization fee.
    </p>
  </SponsorSection>
</template>

<style scoped>
.tiers {
  padding-top: 96px;
  padding-bottom: 48px;
  /* The track bleeds to the right edge of the viewport. */
  overflow-x: clip;
}

.tiers-header {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: flex-end;
  justify-content: space-between;
}

.tiers-title {
  flex: 999 1 480px;
  min-width: 0;
}

.track-controls {
  display: flex;
  gap: 8px;
}

.track-button {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.25s,
    opacity 0.25s;
}

.track-button:not(:disabled):hover {
  background-color: var(--vp-c-bg-soft);
}

.track-button:disabled {
  opacity: 0.4;
  cursor: default;
}

.track-wrapper {
  position: relative;
  margin-right: min(-24px, calc((1152px - 100vw) / 2));
}

.track {
  display: flex;
  gap: 16px;
  align-items: stretch;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 12px;
  padding-right: 24px;
  scroll-padding-right: 24px;
  scrollbar-width: thin;
  scroll-snap-align: center;
  scroll-padding-left: 24px;
  scroll-padding-right: 24px;
}

.track:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
  border-radius: 12px;
}

.fade {
  position: absolute;
  top: 0;
  bottom: 12px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.fade.visible {
  opacity: 1;
}

.fade-left {
  left: 0;
  width: 48px;
  background: linear-gradient(to left, transparent, var(--vp-c-bg));
}

.fade-right {
  right: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, var(--vp-c-bg) 85%);
}

@media (min-width: 640px) {
  .fade-left {
    width: 96px;
  }

  .fade-right {
    width: 160px;
  }

  .track {
    scroll-snap-align: start;
  }
}

.partner {
  padding: 24px 28px;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
}

.partner-text {
  flex: 999 1 480px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.partner-title {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.partner-description,
.disclaimer {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.disclaimer {
  margin-top: -8px;
  font-size: 13px;
  line-height: 20px;
}
</style>
