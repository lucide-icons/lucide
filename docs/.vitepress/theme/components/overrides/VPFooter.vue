<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { computed } from 'vue'

const { theme } = useData()
const { hasSidebar } = useSidebar()

const githubLink = computed(() => theme.value.socialLinks.find(({icon}) => icon === 'github').link)

const links = computed(() => [
  {
    text: 'License',
    href: '/license'
  },
  {
    text: 'Contribute',
    href: '/contributing'
  },
  {
    text: 'Changelog',
    href: `${githubLink.value}/releases`
  },
  {
    text: 'GitHub',
    href: `${githubLink.value}`
  },
  {
    text: 'Issues',
    href: `${githubLink.value}/issues`
  }
])
</script>

<template>
  <footer v-if="theme.footer" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <div class="sponsors">
        <a href="https://vercel.com?utm_source=lucide&utm_campaign=oss" rel="noreferrer noopener">
          <img src="/vercel.svg" alt="Powered by Vercel" width="200" />
        </a>
        <a href="https://www.digitalocean.com/?refcode=b0877a2caebd&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" rel="noreferrer noopener">
          <img src="/digitalocean.svg" alt="Digital Ocean" width="200" />
        </a>
      </div>
      <div class="links">
        <VPLink v-for="link in links" :href="link.href" :key="link.text" :rel="link.href.startsWith('http') ? 'noreferrer noopener': undefined">
          {{ link.text }}
        </VPLink>
      </div>
      <div>
        <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
        <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright"></p>
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

.VPFooter.has-sidebar {
  display: none;
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

.message   { order: 2; }
.copyright { order: 1; }

.links, .sponsors {
  display: flex;
  gap: 32px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
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
