import { DefaultTheme } from "vitepress";

export const solidSidebar = [
    {
      items: [
        {
          text: 'Overview',
          link: '/guide/solid/',
        },
        {
          text: 'Getting started',
          link: '/guide/solid/getting-started',
        },
      ],
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          desc: 'Adjust the color of your icons',
          link: '/guide/solid/basics/color',
        },
        {
          text: 'Sizing',
          desc: 'Adjust the size of your icons',
          link: '/guide/solid/basics/sizing',
        },
        {
          text: 'Stroke width',
          desc: 'Adjust the stroke width of your icons',
          link: '/guide/solid/basics/stroke-width',
        },
      ],
    },
    {
      text: 'Advanced',
      items: [
        {
          text: 'Typescript',
          link: '/guide/solid/advanced/typescript',
          desc: 'All exported types and how to use them',
        },
        {
          text: 'Accessibility',
          link: '/guide/solid/advanced/accessibility',
          desc: 'Making your icons accessible',
        },
        {
          text: 'Global styling',
          link: '/guide/solid/advanced/global-styling',
          desc: 'Apply global styles to all icons',
        },
        {
          text: 'With lucide lab',
          link: '/guide/solid/advanced/with-lucide-lab',
          desc: 'Using lucide-lab with lucide-solid',
        },
        // {
        //   text: 'Animations',
        //   link: '/guide/solid/advanced/animations',
        //   desc: 'Add animations to your icons',
        // },
        {
          text: 'Filled icons',
          link: '/guide/solid/advanced/filled-icons',
          desc: 'Using filled icons in lucide-solid',
        },
        {
          text: 'Aliased Names',
          link: '/guide/solid/advanced/aliased-names',
          desc: 'Using aliased icon names',
        },

        {
          text: 'Combining icons',
          link: '/guide/solid/advanced/combining-icons',
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

