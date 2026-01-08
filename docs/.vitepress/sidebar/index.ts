import { DefaultTheme, UserConfig } from 'vitepress';
import { reactSidebar } from './react';
import { vueSidebar } from './vue';
import { svelteSidebar } from './svelte';
import { lucideSidebar } from './lucide';
import { solidSidebar } from './solid';
import { preactSidebar } from './preact';
import { reactNativeSidebar } from './react-native';

type Sidebar = UserConfig<DefaultTheme.Config>['themeConfig']['sidebar'];

export const guideSidebarTop: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is lucide?', link: '/guide/' },
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
  '/guide/preact/': preactSidebar,
  '/guide/react-native/': reactNativeSidebar,
  '/resources': [
    {
      text: 'Community',
    },
    {
      text: 'Designing icons',
      items: [
        {
          text: 'Icon Design Principles',
          link: '/guide/design/icon-design-guide',
        },
        {
          text: 'Designing in Illustrator',
          link: '/guide/design/illustrator-guide',
        },
        {
          text: 'Designing in InkScape',
          link: '/guide/design/inkscape-guide',
        },
        {
          text: 'Designing in Figma',
          link: '/guide/design/figma-guide',
        },
        {
          text: 'Designing in Affinity Designer',
          link: '/guide/design/affinity-designer-guide',
        },
      ],
    },
  ],
  // This should be here to keep the sidebar shown on the icons page
  icons: [{ text: '', link: '/' }],
};

export default sidebar;
