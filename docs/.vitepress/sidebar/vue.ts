import { DefaultTheme } from "vitepress";

export const vueSidebar = [
    {
      items: [
        {
          text: 'Overview',
          link: '/guide/vue/',
        },
        {
          text: 'Getting started',
          link: '/guide/vue/getting-started',
        },
      ],
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          desc: 'Adjust the color of your icons',
          link: '/guide/vue/basics/color',
        },
        {
          text: 'Sizing',
          desc: 'Adjust the size of your icons',
          link: '/guide/vue/basics/sizing',
        },
        {
          text: 'Stroke width',
          desc: 'Adjust the stroke width of your icons',
          link: '/guide/vue/basics/stroke-width',
        },
      ],
    },
    {
      text: 'Advanced',
      items: [
        {
          text: 'Typescript',
          link: '/guide/vue/advanced/typescript',
          desc: 'All exported types and how to use them',
        },
        {
          text: 'Accessibility',
          link: '/guide/vue/advanced/accessibility',
          desc: 'Making your icons accessible',
        },
        {
          text: 'Global styling',
          link: '/guide/vue/advanced/global-styling',
          desc: 'Apply global styles to all icons',
        },
        {
          text: 'With lucide lab',
          link: '/guide/vue/advanced/with-lucide-lab',
          desc: 'Using lucide-lab with @lucide/vue',
        },
        {
          text: 'Filled icons',
          link: '/guide/vue/advanced/filled-icons',
          desc: 'Using filled icons in @lucide/vue',
        },
        {
          text: 'Aliased Names',
          link: '/guide/vue/advanced/aliased-names',
          desc: 'Using aliased icon names',
        },

        {
          text: 'Combining icons',
          link: '/guide/vue/advanced/combining-icons',
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
    }
  ] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];
