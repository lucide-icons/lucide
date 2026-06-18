<script setup lang="ts">
import { useRouter } from 'vitepress';
import { computed } from 'vue';

const router = useRouter();

const frameworks = [
  {
    ariaLabel: 'Get JavaScript certificates from certificates.dev',
    image: '/certificates-dev/js-certificates-dev.jpg',
    href: 'https://certificates.dev/javascript?friend=LUCIDE',
    routes: [
      '/guide/lucide/',
      '/guide/svelte/',
      '/guide/solid/',
      '/guide/astro/',
      '/guide/static/'
    ],
  },
  {
    ariaLabel: 'Get React certificates from certificates.dev',
    image: '/certificates-dev/react-certificates-dev.jpg',
    href: 'https://certificates.dev/react?friend=LUCIDE',
    routes: [
      '/guide/react/',
      '/guide/react-native/',
      '/guide/preact/',
    ],
  },
  {
    ariaLabel: 'Get Vue certificates from certificates.dev',
    href: 'https://certificates.dev/vuejs?friend=LUCIDE',
    image: '/certificates-dev/vue-certificates-dev.jpg',
    routes: [
      '/guide/vue/',
    ],
  },
  {
    ariaLabel: 'Get Angular certificates from certificates.dev',
    href: 'https://certificates.dev/angular?friend=LUCIDE',
    image: '/certificates-dev/angular-certificates-dev.jpg',
    routes: [
      '/guide/angular/',
    ],
  }
];

const selected = computed(() => {
  const current = frameworks.find(({ routes }) => {
    return routes.some(route => router.route.path.startsWith(route));
  });

  return current || frameworks[0];
});
</script>

<template>
  <a class="certificates-link" :href="selected.href" :aria-label="selected.ariaLabel" target="_blank" rel="noopener noreferrer">
    <img :src="selected.image" :alt="selected.ariaLabel" />
  </a>
</template>

<style scoped>
.certificates-link {
  /* padding: 20px; */
  border-radius: 12px;
  min-height: 100px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  background-color: var(--vp-carbon-ads-bg-color);
  margin-bottom: 20px;
  overflow: hidden;
}

.certificates-link img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  border-radius: 6px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.certificates-link:hover img {
  transform: scale(1.05);
  opacity: 0.9;

}
</style>
