import { DefaultTheme, UserConfig } from 'vitepress';
import { reactSidebar } from './react';
import { vueSidebar } from './vue';
import { svelteSidebar } from './svelte';
import { lucideSidebar } from './lucide';
import { solidSidebar } from './solid';
import { preactSidebar } from './preact';
import { reactNativeSidebar } from './react-native';
import { astroSidebar } from './astro';
import { resourcesSidebar } from './resources';

type Sidebar = UserConfig<DefaultTheme.Config>['themeConfig']['sidebar'];

export const guideSidebarTop: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is lucide?', link: '/guide/' },
      { text: 'Version 1', link: '/guide/version-1' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Comparison', link: '/guide/comparison' },
    ],
  },
];

const sidebar: Sidebar = {
  '/guide': [{ text: '', link: '/' }],
  '/guide/lucide/': lucideSidebar,
  '/guide/react/': reactSidebar,
  '/guide/vue/': vueSidebar,
  '/guide/svelte/': svelteSidebar,
  '/guide/solid/': solidSidebar,
  '/guide/astro/': astroSidebar,
  '/guide/preact/': preactSidebar,
  '/guide/react-native/': reactNativeSidebar,
  '/community': resourcesSidebar,
  '/contribute': resourcesSidebar,
  '/license': resourcesSidebar,
  '/code-of-conduct': resourcesSidebar,
  '/brand-logo-statement': resourcesSidebar,
  // This should be here to keep the sidebar shown on the icons page
  icons: [{ text: '', link: '/' }],
};

export default sidebar;
