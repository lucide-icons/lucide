import { DefaultTheme } from 'vitepress';

export const angularSidebar = [
  {
    items: [
      {
        text: 'Overview',
        link: '/guide/angular/',
      },
      {
        text: 'Getting started',
        link: '/guide/angular/getting-started',
      },
    ],
  },
  {
    text: 'Basics',
    items: [
      {
        text: 'Color',
        desc: 'Adjust the color of your icons',
        link: '/guide/angular/basics/color',
      },
      {
        text: 'Sizing',
        desc: 'Adjust the size of your icons',
        link: '/guide/angular/basics/sizing',
      },
      {
        text: 'Stroke width',
        desc: 'Adjust the stroke width of your icons',
        link: '/guide/angular/basics/stroke-width',
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Typescript',
        link: '/guide/angular/advanced/typescript',
        desc: 'All exported types and how to use them',
      },
      {
        text: 'Accessibility',
        link: '/guide/angular/advanced/accessibility',
        desc: 'Making your icons accessible',
      },
      {
        text: 'Global styling',
        link: '/guide/angular/advanced/global-styling',
        desc: 'Apply global styles to all icons',
      },
      {
        text: 'With lucide lab',
        link: '/guide/angular/advanced/with-lucide-lab',
        desc: 'Using lucide-lab with @lucide/angular',
      },
      // {
      //   text: 'Animations',
      //   link: '/guide/angular/advanced/animations',
      //   desc: 'Add animations to your icons',
      // },
      {
        text: 'Filled icons',
        link: '/guide/angular/advanced/filled-icons',
        desc: 'Using filled icons in @lucide/angular',
      },
      {
        text: 'Combining icons',
        link: '/guide/angular/advanced/combining-icons',
        desc: 'Combine multiple icons into one',
      },
      {
        text: 'Dynamic icon component',
        link: '/guide/angular/advanced/dynamic-icon-component.md',
        desc: 'Dynamically import icons as needed',
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
