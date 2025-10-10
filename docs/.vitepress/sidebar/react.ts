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
    // TODO: Add this section
    {
      text: 'Advanced',
      items: [
        {
          text: 'Typescript',
          link: '/guide/react/advanced/typescript',
          desc: 'Typescript support in lucide-react',
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
        {
          text: 'Animations',
          link: '/guide/react/advanced/animations',
          desc: 'Add animations to your icons',
        },
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
          text: 'Dynamic imports',
          link: '/guide/react/advanced/dynamic-imports',
          desc: 'Dynamically import icons as needed',
        },
        {
          text: 'VSCode',
          link: '/guide/react/advanced/vscode',
          desc: 'Configure VSCode for lucide-react',
        },
      ],
    },
    // {
    //   text: 'Packages',
    //   items: [
    //     {
    //       text: 'Lucide',
    //       link: '/guide/packages/lucide',
    //     },
    //     {
    //       text: 'Lucide React',
    //       link: '/guide/packages/lucide-react',
    //     },
    //     {
    //       text: 'Lucide Vue',
    //       link: '/guide/packages/lucide-vue',
    //     },
    //     {
    //       text: 'Lucide Svelte',
    //       link: '/guide/packages/lucide-svelte',
    //     },
    //     {
    //       text: 'Lucide Solid',
    //       link: '/guide/packages/lucide-solid',
    //     },
    //     {
    //       text: 'Lucide React Native',
    //       link: '/guide/packages/lucide-react-native',
    //     },
    //     {
    //       text: 'Lucide Angular',
    //       link: '/guide/packages/lucide-angular',
    //     },
    //     {
    //       text: 'Lucide Preact',
    //       link: '/guide/packages/lucide-preact',
    //     },
    //     {
    //       text: 'Lucide Astro',
    //       link: '/guide/packages/lucide-astro',
    //     },
    //     {
    //       text: 'Lucide Static',
    //       link: '/guide/packages/lucide-static',
    //     },
    //   ],
    // },
  ] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];

