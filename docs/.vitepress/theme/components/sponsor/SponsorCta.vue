<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import SponsorSection from './SponsorSection.vue';
</script>

<template>
  <SponsorSection class="cta">
    <div class="cta-card">
      <h2 class="title">You like building with Lucide?</h2>
      <p class="description">
        Help keep it beautiful and consistent for everyone who comes after you.
      </p>
      <div class="actions">
        <VPButton
          href="#tiers"
          text="Become a sponsor"
          size="big"
        />
        <VPButton
          href="https://github.com/lucide-icons/lucide"
          text="Star on GitHub"
          size="big"
          theme="alt"
        />
      </div>
    </div>
  </SponsorSection>
</template>

<style scoped>
.cta {
  padding-top: 0;
  padding-bottom: 96px;
}

.cta-card {
  padding: 48px 32px;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

.title {
  margin: 0;
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.description {
  margin-bottom: 24px;
  max-width: 640px;
  font-size: 18px;
  line-height: 28px;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
</style>
