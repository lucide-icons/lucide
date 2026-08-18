<script setup lang="ts">
import { useData } from 'vitepress';
import HomeContainer from './HomeContainer.vue'
import GridSection from '../base/GridSection.vue'
import TeamMemberCard, { TeamMember } from './TeamMemberCard.vue'
import teamData from '../../../data/teamData.json'
import HomeSponsorCard from './HomeSponsorCard.vue';
import VPDocAsideCarbonAds from 'vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue'


const { theme } = useData()
</script>

<template>
   <HomeContainer>
    <GridSection
      title="Meet the team"
      :headingLevel="2"
      class="team-members"
    >
      <TeamMemberCard
        v-for="teamMember in (teamData as TeamMember[])"
        v-bind="teamMember"
      />
    </GridSection>
    <HomeSponsorCard />
    <VPDocAsideCarbonAds
      :carbon-ads="theme.carbonAds"
      class="ad-card"
    />
  </HomeContainer>
</template>


<style scoped>
.team-members {
  gap: 24px;
  margin-top: 48px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .team-members :deep(.card-grid > *) {
    flex-basis: 50%;
  }
}

@media (min-width: 768px) {
  .team-members :deep(.card-grid > *) {
    flex-basis: 33.33%;
  }
}

.ad-card {
  margin: 32px auto 0;
  width: 100%;;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  display: none;
}

@media (min-width: 960px) {
  .ad-card {
    display: block;
  }
}

.ad-card :deep(.VPCarbonAds) {
  width: 100%;
  text-align: left;
  min-height: auto;
}

.ad-card :deep(.VPCarbonAds .carbon-wrap) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
}

.ad-card :deep(.VPCarbonAds .carbon-text) {
  padding-top: 0;
}

.ad-card :deep(.VPCarbonAds .carbon-poweredby) {
  text-align: right;
  margin-top: -24px;
}
</style>
