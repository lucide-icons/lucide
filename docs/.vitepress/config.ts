import { fileURLToPath, URL } from 'node:url';
import type { Plugin } from 'vite';
import { defineConfig, UserConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import sidebar from './sidebar/index.ts';
import { nitro } from 'nitro/vite';
import snackPlayer from './markdown/snackPlayer.ts';
import sandpackPlugin from './markdown/sandpack.ts';
import examplePlugin from './markdown/example.ts';
import { readFile } from 'node:fs/promises';
import { resourcesSidebar } from './sidebar/resources.ts';
import llmstxt from 'vitepress-plugin-llms';
import { transformPageData } from './transformPageData.ts';
import getHeadConfig from './getHeadConfig.ts';

const defaultSandpackCSS = await readFile(
  fileURLToPath(new URL('./theme/sandpack-default.css', import.meta.url)),
  'utf-8',
);
const iconStyleHeadScript = await readFile(
  fileURLToPath(new URL('./theme/iconStyleHead.js', import.meta.url)),
  'utf-8',
);

const title = 'Lucide';
const socialTitle = 'Lucide Icons';
const description = 'Beautiful & consistent icon toolkit made by the community.';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Nitro's dev middleware assumes it owns the app: it answers every extensionless request and
 * never falls through, so VitePress pages would 404. `_nitroHandled` is the flag it checks to
 * skip a request. It is private, so re-check this when upgrading Nitro.
 */
const nitroApiOnly: Plugin = {
  name: 'lucide:nitro-api-only',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (!req.url?.startsWith('/api/')) {
        (req as typeof req & { _nitroHandled?: boolean })._nitroHandled = true;
      }
      next();
    });
  },
};

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
      md.use(examplePlugin);
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
    // Nitro defaults this to 'custom', which drops the HTML fallback VitePress relies on in dev.
    appType: 'spa',
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
          find: /^.*\/VPNavBarSearch\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/overrides/VPNavBarSearch.vue', import.meta.url),
          ),
        },
        {
          find: '~/.vitepress',
          replacement: fileURLToPath(new URL('./', import.meta.url)),
        },
      ],
    },
    plugins: [
      isDev && nitroApiOnly,
      isDev && nitro(),
      groupIconVitePlugin(),
      llmstxt({
        ignoreFiles: [
          'code-of-conduct.md',
          'index.md',
          'packages.md',
          'showcase.md',
          'sponsor.md',
          'brand-logo-statement.md',
          'icons/**', // Not working, need investigation
        ],
      }) as unknown as UserConfig['vite']['plugins'][0],
    ],
  },
  head: [
    ...getHeadConfig({ title, description, socialTitle }),
    ['script', {}, iconStyleHeadScript],
  ],
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
          ...resourcesSidebar[0].items.map(({ text, link }) => ({ text, link })),
          { text: 'How to use icons', link: '/how-to/' },
          { text: 'Contributing icons', link: '/contribute/icons/' },
        ],
      },
      { text: 'Packages', link: '/packages' },
      { text: 'Showcase', link: '/showcase' },
      { text: 'Merch', link: 'https://merch.lucide.dev/' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lucide-icons/lucide' },
      { icon: 'discord', link: 'https://discord.gg/EH6nSts' },
      { icon: 'x', link: 'https://x.com/lucide_icons' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/lucide-icons/' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/lucide-icons.bsky.social' },
    ],
    footer: {
      message: 'Released under the ISC License.',
      copyright: `Copyright © ${new Date().getFullYear()} Lucide Icons`,
    },
    editLink: {
      pattern: 'https://github.com/lucide-icons/lucide/edit/main/docs/:path',
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'R7KKMCPXOB',
        apiKey: 'dd3101054267d35fb28f49c42715f1aa',
        indexName: 'lucide',
      },
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
