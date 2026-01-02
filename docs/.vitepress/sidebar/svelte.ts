import { DefaultTheme } from 'vitepress';

export const svelteSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/svelte/',
      },
      {
        text: 'Getting started',
        link: '/guide/svelte/getting-started',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/svelte/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/svelte/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/svelte/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Typescript',
        link: '/guide/svelte/advanced/typescript',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Accessibility',
        link: '/guide/svelte/advanced/accessibility',
        desc: 'Making your icons accessible',
      },
      {
        text: 'Global styling',
        link: '/guide/svelte/advanced/global-styling',
        desc: 'Apply global styles to all icons',
      },
      {
        text: 'With lucide lab',
        link: '/guide/svelte/advanced/with-lucide-lab',
        desc: 'Using lucide-lab with @lucide/svelte',
      },
      {
        text: 'Filled icons',
        link: '/guide/svelte/advanced/filled-icons',
        desc: 'Using filled icons in @lucide/svelte',
      },
      {
        text: 'Combining icons',
        link: '/guide/svelte/advanced/combining-icons',
        desc: 'Combine multiple icons into one',
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
      {
        text: 'VSCode',
        link: '/guide/vscode',
        desc: 'VSCode and Lucide',
      },
    ],
  },
] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
