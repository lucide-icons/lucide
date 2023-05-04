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
        }
      ]
    }
  },
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
    ]
  }
})
