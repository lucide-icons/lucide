import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitepress';
import sidebar from './sidebar';

const title = 'Lucide';
const socialTitle = 'Lucide Icons';
const description = 'Beautiful & consistent icon toolkit made by the community.';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  titleTemplate: ':title \u2013 Lucide',
  description,
  cleanUrls: true,
  outDir: '.vercel/output/static',
  srcExclude: ['**/README.md'],
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPIconAlignLeft\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPIconAlignLeft.vue', import.meta.url),
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPFooter.vue', import.meta.url),
          ),
        },
        {
          find: '~/.vitepress',
          replacement: fileURLToPath(new URL('./', import.meta.url)),
        },
      ],
    },
  },
  head: [
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://analytics.lucide.dev',
      },
    ],
    [
      'script',
      {
        src: 'https://analytics.lucide.dev/js/script.js',
        'data-domain': 'lucide.dev',
        defer: '',
      },
    ],
    [
      'meta',
      {
        property: 'og:locale',
        content: 'en_US',
      },
    ],
    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    [
      'meta',
      {
        property: 'og:site_name',
        content: title,
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: socialTitle,
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: 'https://lucide.dev',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://lucide.dev/og.png',
      },
    ],
    [
      'meta',
      {
        property: 'og:image:width',
        content: '1200',
      },
    ],
    [
      'meta',
      {
        property: 'og:image:height',
        content: '630',
      },
    ],
    [
      'meta',
      {
        property: 'og:image:type',
        content: 'image/png',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:title',
        content: socialTitle,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: description,
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'https://lucide.dev/og.png',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg',
    },
    nav: [
      { text: 'Icons', link: '/icons/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Packages', link: '/packages' },
      { text: 'Showcase', link: '/showcase' },
      { text: 'License', link: '/license' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lucide-icons/lucide' },
      { icon: 'discord', link: 'https://discord.gg/EH6nSts' },
    ],
    footer: {
      message: 'Released under the ISC License.',
      copyright: `Copyright © ${new Date().getFullYear()} Lucide Contributors`,
    },
    editLink: {
      pattern: 'https://github.com/lucide-icons/lucide/edit/main/docs/:path',
    },
    carbonAds: {
      code: 'CWYIC53U',
      placement: 'lucidedev',
    },
  },
  sitemap: {
    hostname: 'https://lucide.dev/',
  },
});
