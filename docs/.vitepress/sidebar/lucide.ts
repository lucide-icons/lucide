import { DefaultTheme } from 'vitepress';

export const lucideSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/lucide/',
      },
      {
        text: 'Getting started',
        link: '/guide/lucide/getting-started',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/lucide/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/lucide/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/lucide/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Global styling',
        link: '/guide/lucide/advanced/global-styling',
        desc: 'Apply options and styles globally',
      },
      {
        text: 'Shadow DOM',
        link: '/guide/lucide/advanced/shadow-dom',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Template element',
        link: '/guide/lucide/advanced/content-template-element',
        desc: 'Using content template element with lucide',
      },
      // {
      //   text: 'Accessibility',
      //   link: '/guide/lucide/advanced/accessibility',
      //   desc: 'Making your icons accessible',
      // },
      {
        text: 'With lucide lab',
        link: '/guide/lucide/advanced/with-lucide-lab',
        desc: 'Using lucide-lab with lucide',
      },
      {
        text: 'Filled icons',
        link: '/guide/lucide/advanced/filled-icons',
        desc: 'Using filled icons in lucide',
      },
    ],
  },
  {
    text: 'Resources',
    items: [
      {
        text: 'Accessibility in depth',
        link: '/guide/accessibility',
        desc: 'Accessibility best practices',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
