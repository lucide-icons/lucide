<script lang="ts">
export interface TeamMember {
  name: string
  title: string
  image: string
  sponsor?: string
  socialLinks: DefaultTheme.SocialLink[]
}
</script>

<script setup lang="ts">
import { DefaultTheme } from 'vitepress';
import Card from '../base/Card.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'

defineProps<TeamMember>()
</script>

<template>
  <div>
    <Card class="member-card">
      <img :src="image" :alt="name" class="member-image"/>
      <h3 class="member-name">
        {{name}}
      </h3>
      <p class="member-title">
        {{title}}
      </p>
      <div class="member-links">
        <VPButton
          v-if="sponsor"
          :href="sponsor"
          text="Sponsor"
          theme="sponsor"
          class="sponsor-button"
          size="medium"
        />
        <VPSocialLinks
          :links="socialLinks"
        />
      </div>

    </Card>
  </div>
</template>

<style scoped>
.member-card {
  flex-basis: 100%;
  height:100%;
}

.member-image {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin: 0 auto;
  background-color: var(--vp-c-bg);
}

.member-name {
  text-align: center;
  margin-top: 16px;
  font-size: 21px;
  font-weight: 500;
  color: var(--textColor);
}

.member-title {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-align: center;
  text-wrap: balance;
  margin-bottom: 16px;;
}

.sponsor-button {
  width: auto;
}

.member-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
