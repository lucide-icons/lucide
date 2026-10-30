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
import Icon from '@lucide/vue/src/Icon'
import Card from '../base/Card.vue'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'
import { heart } from '../../../data/iconNodes'

defineProps<TeamMember>()
</script>

<template>
  <div>
    <Card class="member-card">
      <a :href="socialLinks[0]?.link" target="_blank" rel="noreferrer noopener">
      <img :src="image" :alt="name" class="member-image"/>
      </a>
      <h3 class="member-name">
        {{name}}
      </h3>
      <p class="member-title">
        {{title}}
      </p>
      <div class="member-links">
        <a
          v-if="sponsor"
          :href="sponsor"
          class="sponsor-button"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon
            :iconNode="heart"
            name="heart"
            :size="16"
            class="sponsor-heart"
            aria-hidden="true"
          />
          Sponsor
        </a>
        <VPSocialLinks
          :links="socialLinks"
          class="member-social-links"
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
  box-shadow: 0 0 0 0 transparent;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transition-duration: 0.3s !important;
}

.member-image:hover {
  transform: scale(1.06);
  box-shadow: 0 0 0 3px var(--vp-c-bg-soft), 0 0 0 5px var(--vp-c-brand-1);
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

.member-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.sponsor-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px 0 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background-color: var(--vp-c-bg);
  transition: color 0.25s, background-color 0.25s, border-color 0.25s;
  transition-duration: 0.25s !important;
}

.sponsor-heart {
  color: var(--vp-c-sponsor);
  transition: color 0.25s, fill 0.25s;
  transition-duration: 0.25s !important;
}

.sponsor-button:hover,
.sponsor-button:focus-visible {
  outline: none;
  color: #fff;
  border-color: var(--vp-c-sponsor);
  background-color: var(--vp-c-sponsor);
}

.sponsor-button:hover .sponsor-heart,
.sponsor-button:focus-visible .sponsor-heart {
  color: #fff;
  fill: #fff;
  animation: heartbeat 1s ease-in-out infinite;
  animation-duration: 1s !important;
  animation-iteration-count: infinite !important;
}

@keyframes heartbeat {
  0%,
  40%,
  100% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.25);
  }

  60% {
    transform: scale(1.15);
  }
}

/* Social icons get a soft rounded background and lift a little on hover */
.member-social-links :deep(.VPSocialLink) {
  border-radius: 8px;
  transition: color 0.25s, background-color 0.25s, transform 0.25s;
  transition-duration: 0.25s !important;
}

.member-social-links :deep(.VPSocialLink:hover),
.member-social-links :deep(.VPSocialLink:focus-visible) {
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
  transform: translateY(-2px);
}
</style>
