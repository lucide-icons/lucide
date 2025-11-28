import { DefaultTheme } from "vitepress";

export const reactNativeSidebar = [
    {
      items: [
        {
          text: 'Overview',
          link: '/guide/react-native/',
        },
        {
          text: 'Getting started',
          link: '/guide/react-native/getting-started',
        },
      ],
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          desc: 'Adjust the color of your icons',
          link: '/guide/react-native/basics/color',
        },
        {
          text: 'Sizing',
          desc: 'Adjust the size of your icons',
          link: '/guide/react-native/basics/sizing',
        },
        {
          text: 'Stroke width',
          desc: 'Adjust the stroke width of your icons',
          link: '/guide/react-native/basics/stroke-width',
        },
      ],
    },
    {
      text: 'Advanced',
      items: [
        {
          text: 'Typescript',
          link: '/guide/react-native/advanced/typescript',
          desc: 'All exported types and how to use them',
        },
        {
          text: 'Accessibility',
          link: '/guide/react-native/advanced/accessibility',
          desc: 'Making your icons accessible',
        },
        {
          text: 'Global styling',
          link: '/guide/react-native/advanced/global-styling',
          desc: 'Apply global styles to all icons',
        },
        {
          text: 'With lucide lab',
          link: '/guide/react-native/advanced/with-lucide-lab',
          desc: 'Using lucide-lab with lucide-react-native',
        },
        // {
        //   text: 'Animations',
        //   link: '/guide/react-native/advanced/animations',
        //   desc: 'Add animations to your icons',
        // },
        {
          text: 'Filled icons',
          link: '/guide/react-native/advanced/filled-icons',
          desc: 'Using filled icons in lucide-react-native',
        },
        {
          text: 'Aliased Names',
          link: '/guide/react-native/advanced/aliased-names',
          desc: 'Using aliased icon names',
        },

        {
          text: 'Combining icons',
          link: '/guide/react-native/advanced/combining-icons',
          desc: 'Combine multiple icons into one',
        },
        {
          text: 'Dynamic icon component',
          link: '/guide/react-native/advanced/dynamic-icon-component.md',
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

