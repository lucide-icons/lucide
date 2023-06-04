import { fileURLToPath, URL } from 'node:url'
import path from 'path';
import { defineConfig } from 'vitepress'
import sidebar from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "Lucide",
  description: "Beautiful & consistent icon toolkit made by the community.",
  outDir: '.vercel/output/static',
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPIconAlignLeft\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPIconAlignLeft.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPFooter.vue', import.meta.url)
          )
        }
      ]
    }
  },
  head: [
    [
      'script',
      {
        src: 'https://plausible.io/js/script.js',
        'data-domain': 'lucide.dev',
        defer: ''
      }
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg'
    },
    nav: [
      { text: 'Icons', link: '/icons/index.md' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Packages', link: '/packages' },
      { text: 'License', link: '/license' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lucide-icons/lucide' },
      { icon: 'discord', link: 'https://discord.gg/EH6nSts' }
    ],
    footer: {
      message: 'Released under the ISC License.',
      copyright: `Copyright © ${new Date().getFullYear()} Lucide Contributors`
    },
    editLink: {
      pattern: 'https://github.com/lucide-icons/lucide/edit/main/docs/:path'
    },
  }
})
