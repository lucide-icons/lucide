<script setup lang="ts">
import HomeContainer from './HomeContainer.vue'
import GridSection from '../base/GridSection.vue'
import TeamMemberCard, { TeamMember } from './TeamMemberCard.vue'
import teamData from '../../../data/teamData.json'
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
   </HomeContainer>
</template>


<style scoped>
.team-members {
  gap: 24px;
  margin-top: 48px;
  margin-bottom: 48px;
}

.team-members :deep(.card-grid) {

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
</style>
