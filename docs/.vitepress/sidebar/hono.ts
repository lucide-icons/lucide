import { DefaultTheme } from 'vitepress';

export const honoSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/hono/',
      },
      {
        text: 'Getting started',
        link: '/guide/hono/getting-started',
        desc: 'Learn how to get started with Lucide for Hono.',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/hono/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/hono/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/hono/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Typescript',
        link: '/guide/hono/advanced/typescript',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Accessibility',
        link: '/guide/hono/advanced/accessibility',
        desc: 'Making your icons accessible',
      },
      {
        text: 'Global styling',
        link: '/guide/hono/advanced/global-styling',
        desc: 'Apply global styles to all icons',
      },
      {
        text: 'With Lucide Lab',
        link: '/guide/hono/advanced/with-lucide-lab',
        desc: 'Using lucide-lab with @lucide/hono',
      },
    ],
  },
  {
    text: 'Resources',
    items: [
      {
        text: 'Accessibility in depth',
        link: '/how-to/accessibility',
        desc: 'Accessibility best practices',
      },
      {
        text: 'VSCode',
        link: '/guide/vscode',
        desc: 'VSCode and Lucide',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
