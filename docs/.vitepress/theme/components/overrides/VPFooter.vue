<script setup lang="ts">
import { useData } from 'vitepress';
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import { computed } from 'vue';
import SurveyAskOverlay from '../SurveyAskOverlay.vue';

const { theme } = useData();
const { hasSidebar } = useSidebar();

const githubLink = computed(
  () => theme.value.socialLinks.find(({ icon }) => icon === 'github').link,
);

const links = computed(() => [
  {
    text: 'License',
    href: '/license',
  },
  {
    text: 'Contribute',
    href: '/contribute/',
  },
  {
    text: 'Changelog',
    href: `${githubLink.value}/releases`,
  },
  {
    text: 'GitHub',
    href: `${githubLink.value}`,
  },
  {
    text: 'Issues',
    href: `${githubLink.value}/issues`,
  },
]);
</script>

<template>
  <footer
    v-if="theme.footer"
    class="VPFooter"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <div class="sponsors">
        <a
          href="https://vercel.com?utm_source=lucide&utm_campaign=oss"
          rel="noreferrer noopener"
        >
          <img
            src="/vercel.svg"
            alt="Powered by Vercel"
            width="200"
          />
        </a>
      </div>
      <div class="links">
        <VPLink
          v-for="link in links"
          :href="link.href"
          :key="link.text"
          class="footer-link"
          :rel="link.href.startsWith('http') ? 'noreferrer noopener' : undefined"
        >
          {{ link.text }}
        </VPLink>
      </div>
      <div>
        <p
          v-if="theme.footer.message"
          class="message"
          v-html="theme.footer.message"
        ></p>
        <p
          v-if="theme.footer.copyright"
          class="copyright"
          v-html="theme.footer.copyright"
        ></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

/* On pages with a sidebar the footer moves over by the sidebar width, like the page content,
   so its links are on every page */
@media (min-width: 960px) {
  .VPFooter.has-sidebar {
    padding-left: calc(var(--vp-sidebar-width) + 32px);
  }
}

@media (min-width: 1440px) {
  .VPFooter.has-sidebar {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2 + 32px);
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width) + 32px);
  }
}

.container {
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.message {
  order: 2;
}
.copyright {
  order: 1;
}

.links,
.sponsors {
  display: flex;
  gap: 32px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

/* Same hover underline as the nav bar links, see utils/underlineDirection.ts */
.footer-link {
  position: relative;
  transition: color 0.25s;
}

.footer-link:hover,
.footer-link:focus-visible {
  color: var(--vp-c-brand-1);
}

.footer-link::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
  transform: scaleX(0);
  transform-origin: var(--underline-origin, right);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.35s !important;
}

.footer-link:hover::before,
.footer-link:focus-visible::before {
  transform: scaleX(1);
  transform-origin: var(--underline-origin, left);
}

@media (min-width: 1152px) {
  .VPFooter {
    padding: 32px;
  }

  .container {
    flex-direction: row-reverse;
  }
  .links {
    margin-right: auto;
  }
}
</style>
