import { fileURLToPath, URL } from 'node:url';
import { defineConfig, UserConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import sidebar from './sidebar';
import snackPlayer from './markdown/snackPlayer';
import sandpackPlugin from './markdown/sandpack';
import { readFile } from 'node:fs/promises';
import { resourcesSidebar } from './sidebar/resources';
import llmstxt from 'vitepress-plugin-llms';
import { transformPageData } from './transformPageData';
import getHeadConfig from './getHeadConfig';

const defaultSandpackCSS = await readFile(
  fileURLToPath(new URL('./theme/sandpack-default.css', import.meta.url)),
  'utf-8',
);

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
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
      md.use(snackPlayer);
      md.use(sandpackPlugin, {
        defaultFiles: {
          '/styles.css': {
            code: defaultSandpackCSS,
            hidden: true,
          },
        },
      });
    },
  },
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
          find: /^.*\/VPCarbonAds\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPCarbonAds.vue', import.meta.url),
          ),
        },
        {
          find: '~/.vitepress',
          replacement: fileURLToPath(new URL('./', import.meta.url)),
        },
      ],
    },
    plugins: [
      groupIconVitePlugin(),
      llmstxt({
        ignoreFiles: [
          'code-of-conduct.md',
          'index.md',
          'packages.md',
          'showcase.md',
          'brand-logo-statement.md',
          'icons/**', // Not working, need investigation
        ],
      }) as unknown as UserConfig['vite']['plugins'][0],
    ],
  },
  head: getHeadConfig({ title, description, socialTitle }),
  transformPageData,
  themeConfig: {
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg',
    },
    nav: [
      { text: 'Icons', link: '/icons/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Resources',
        items: [
          ...resourcesSidebar[0].items,
          { text: 'Design icons', link: '/contribute/icon-design-guide' },
        ],
      },
      { text: 'Packages', link: '/packages' },
      { text: 'Showcase', link: '/showcase' },
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
