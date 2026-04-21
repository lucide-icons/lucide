import { DefaultTheme } from 'vitepress';

export const litSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/lit/',
      },
      {
        text: 'Getting started',
        link: '/guide/lit/getting-started',
        desc: 'Learn how to get started with Lucide for Lit.',
      },
    ],
  },
  {
    text: 'Reference',
    items: [
      {
        text: 'Package',
        link: '/guide/packages/lucide-lit',
        desc: 'API, props, and usage details for lucide-lit.',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
