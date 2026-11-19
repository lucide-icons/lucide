<script setup lang="ts">
import { useRouter } from 'vitepress';
import { ShowcaseItem } from "../../types";
import Card from '../base/Card.vue'

const { go } = useRouter()
defineProps<{
  showcaseItem: ShowcaseItem,
}>()
</script>

<template>
  <div>
    <Card
      class="company"
      :href="showcaseItem.url"
      :aria-label="showcaseItem.name"
    >
      <img
        :src="showcaseItem.image.light"
        class="logo light"
        :alt="`${showcaseItem.name} logo`"
      />
      <img
        :src="showcaseItem.image.dark"
        class="logo dark"
        :alt="`${showcaseItem.name} logo`"
      />
      <span
        class="company-name"
        aria-hidden="true"
        >{{ showcaseItem.name }}</span
      >
      <span
        class="company-arrow"
        aria-hidden="true"
      />
    </Card>
  </div>
</template>

<style scoped>
.company {
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100%;
  padding: 48px 0;
}

/* On hover the card lifts with a brand border, the logo grows and moves up a little to make
   room for the name sliding in below it, and an arrow shows the link opens the site */
.company:hover,
.company:focus-visible {
  outline: none;
}

.logo {
  height:64px;
  width: 240px;
  margin: auto;
  opacity: 0.8;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
  transition-duration: 0.4s, 0.3s;
}

.company:hover .logo,
.company:focus-visible .logo {
  opacity: 1;
  transform: translateY(-8px) scale(1.02);
}

.company-name {
  position: absolute;
  right: 0;
  bottom: 14px;
  left: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.3s, transform 0.3s ease;
  transition-duration: 0.3s;
}

.company:hover .company-name,
.company:focus-visible .company-name {
  opacity: 1;
  transform: translateY(0);
}

/* Lucide's arrow-up-right icon */
.company-arrow {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 18px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M7 7h10v10'/%3E%3Cpath d='M7 17 17 7'/%3E%3C/svg%3E") center / contain no-repeat;
  opacity: 0;
  transform: translate(-6px, 6px);
  transition: opacity 0.3s, transform 0.3s ease;
  transition-duration: 0.3s;
}

.company:hover .company-arrow,
.company:focus-visible .company-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

html.dark .logo.dark {
  display: none;
}
html:not(.dark) .logo.light {
  display: none;
}
</style>
