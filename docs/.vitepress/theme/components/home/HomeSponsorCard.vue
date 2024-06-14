<script setup lang="ts">
import Card from '../base/Card.vue';
import HomeSectionTitle from './HomeSectionTitle.vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
</script>

<template>
  <HomeSectionTitle :headingLevel="3"> Sponsor the Lucide maintainers </HomeSectionTitle>
  <Card class="sponsor-card">
    <img
      src="/company-logos/open-collective-light.svg"
      alt="Open Collective logo"
      class="logo light"
      width="242"
      height="42"
    />
    <img
      src="/company-logos/open-collective-dark.svg"
      alt="Open Collective logo"
      class="logo dark"
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

html.dark .logo.dark {
  display: none;
}
html:not(.dark) .logo.light {
  display: none;
}

@media (min-width: 640px) {
  .sponsor-card {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
