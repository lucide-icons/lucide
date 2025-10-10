import { DefaultTheme, UserConfig } from 'vitepress';
import { reactSidebar } from './react';
import { vueSidebar } from './vue';

type Sidebar = UserConfig<DefaultTheme.Config>['themeConfig']['sidebar']

export const guideSidebarTop: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is lucide?', link: '/guide/' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Comparison', link: '/guide/comparison' },
    ],
  },
  // {
  //   text: 'General',
  //   collapsed: true,
  //   items: [
  //     { text: 'Accessibility', link: '/guide/general/accessibility' },
  //     { text: 'Accessibility', link: '/guide/general/accessibility' },
  //   ]
  // }
]

const sidebar: Sidebar = {
  'guide': [ ...reactSidebar ],
  'guide/react': reactSidebar,
  'guide/vue': vueSidebar,
  'resources': [
    {
      text: 'Contributing',
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
