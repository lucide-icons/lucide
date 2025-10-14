import { DefaultTheme } from "vitepress";

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
    // TODO: Add this section
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
          text: 'Animations',
          link: '/guide/svelte/advanced/animations',
          desc: 'Add animations to your icons',
        },
        {
          text: 'Filled icons',
          link: '/guide/svelte/advanced/filled-icons',
          desc: 'Using filled icons in @lucide/svelte',
        },
        {
          text: 'Aliased Names',
          link: '/guide/svelte/advanced/aliased-names',
          desc: 'Using aliased icon names',
        },

        {
          text: 'Combining icons',
          link: '/guide/svelte/advanced/combining-icons',
          desc: 'Combine multiple icons into one',
        },
        {
          text: 'Dynamic imports',
          link: '/guide/svelte/advanced/dynamic-imports',
          desc: 'Dynamically import icons as needed',
        },
        {
          text: 'VSCode',
          link: '/guide/svelte/advanced/vscode',
          desc: 'Configure VSCode for @lucide/svelte',
        },
      ],
    },
  ] satisfies DefaultTheme.SidebarItem[] & { items: { desc?: string }[] }[];

