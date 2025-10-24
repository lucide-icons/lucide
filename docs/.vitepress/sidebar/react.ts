import { DefaultTheme } from "vitepress";

export const reactSidebar = [
    {
      items: [
        {
          text: 'Overview',
          link: '/guide/react/',
        },
        {
          text: 'Getting started',
          link: '/guide/react/getting-started',
        },
      ],
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          desc: 'Adjust the color of your icons',
          link: '/guide/react/basics/color',
        },
        {
          text: 'Sizing',
          desc: 'Adjust the size of your icons',
          link: '/guide/react/basics/sizing',
        },
        {
          text: 'Stroke width',
          desc: 'Adjust the stroke width of your icons',
          link: '/guide/react/basics/stroke-width',
        },
      ],
    },
    {
      text: 'Advanced',
      items: [
        {
          text: 'Typescript',
          link: '/guide/react/advanced/typescript',
          desc: 'All exported types and how to use them',
        },
        {
          text: 'Accessibility',
          link: '/guide/react/advanced/accessibility',
          desc: 'Making your icons accessible',
        },
        {
          text: 'Global styling',
          link: '/guide/react/advanced/global-styling',
          desc: 'Apply global styles to all icons',
        },
        {
          text: 'With lucide lab',
          link: '/guide/react/advanced/with-lucide-lab',
          desc: 'Using lucide-lab with lucide-react',
        },
        // {
        //   text: 'Animations',
        //   link: '/guide/react/advanced/animations',
        //   desc: 'Add animations to your icons',
        // },
        {
          text: 'Filled icons',
          link: '/guide/react/advanced/filled-icons',
          desc: 'Using filled icons in lucide-react',
        },
        {
          text: 'Aliased Names',
          link: '/guide/react/advanced/aliased-names',
          desc: 'Using aliased icon names',
        },

        {
          text: 'Combining icons',
          link: '/guide/react/advanced/combining-icons',
          desc: 'Combine multiple icons into one',
        },
        {
          text: 'Dynamic icon component',
          link: '/guide/react/advanced/dynamic-icon-component.md',
          desc: 'Dynamically import icons as needed',
        }
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

