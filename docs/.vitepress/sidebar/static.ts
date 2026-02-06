import { DefaultTheme } from 'vitepress';

export const vueSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/vue/',
      },
      {
        text: 'Getting started',
        link: '/guide/static/getting-started',
      },
    ],
  },
  {
    text: 'SVG Files & Sprite',
    items: [
      {
        text: 'Link as image',
        desc: 'Use icons as images in your project',
        link: '',
      },
      {
        text: 'Use in css',
        desc: 'Use icons in your css files',
        link: '',
      },
      {
        text: 'SVG Sprite',
        desc: 'Use SVG sprites in your project',
        link: '',
      },
    ],
  },
  {
    text: 'Icon Font',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '',
      },
    ],
  },
  {
    text: 'Javascript modules',
    items: [
      {
        text: 'Use in Node.js',
        desc: 'Use Lucide in your Node.js projects',
        link: '',
      },
      {
        text: 'Use in JS projects',
        desc: 'Use Lucide in your JavaScript projects',
        link: '',
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
