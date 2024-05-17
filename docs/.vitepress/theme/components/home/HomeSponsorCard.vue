<script setup lang="ts">
import Card from '../base/Card.vue'
import HomeSectionTitle from './HomeSectionTitle.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
</script>

<template>
  <HomeSectionTitle :headingLevel="3">
    Sponsor the Lucide maintainers
  </HomeSectionTitle>
  <Card class="sponsor-card">
    <img
      src="/open-collective.png"
      alt="Open Collective logo"
      width="242"
      height="42"
    />
    <VPButton
      href="https://opencollective.com/lucide-icons"
      class="sponsor-button"
      text="Become a sponsor"
    />
  </Card>
</template>

<style scoped>
.sponsor-card {
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.sponsor-button {
  margin: auto 0;
}

@media (min-width: 640px) {
  .sponsor-card {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
