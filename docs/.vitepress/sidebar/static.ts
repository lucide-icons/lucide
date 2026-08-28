import { DefaultTheme } from 'vitepress';

export const lucideStaticSidebar = [
  {
    items: [
      {
        text: 'Overview',
        desc: 'Overview of using Lucide icons as static assets in your projects',
        link: '/guide/static/',
      },
      {
        text: 'Getting started',
        link: '/guide/static/getting-started',
        desc: 'Learn how to get started with Lucide static.',
      },
      {
        text: 'Migration from v0',
        link: '/guide/static/migration',
        desc: 'Learn how to migrate from v0 to v1 of Lucide static.',
      },
    ],
  },
  {
    text: 'SVG Files & Sprite',
    items: [
      {
        text: 'Import SVG files as images',
        desc: 'Use icons as images in your project',
        link: '/guide/static/link-as-image',
      },
      {
        text: 'SVG Sprite',
        desc: 'Use SVG sprites in your project',
        link: '/guide/static/svg-sprite',
      },
    ],
  },
  {
    text: 'Icon Font',
    items: [
      {
        text: 'Import as font',
        desc: 'Use icons as a web font in your project',
        link: '/guide/static/font/',
      },
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/static/font/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/static/font/sizing',
      },
    ],
  },
  {
    text: 'SVG String JS modules',
    items: [
      {
        text: 'Use in Node.js',
        desc: 'Use Lucide in your Node.js projects',
        link: '/guide/static/js-modules/node',
      },
      {
        text: 'Use in JS projects',
        desc: 'Use Lucide in your JavaScript projects',
        link: '/guide/static/js-modules/web',
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
