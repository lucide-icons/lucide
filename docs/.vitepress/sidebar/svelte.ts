import { DefaultTheme } from "vitepress";

export const svelteSidebar: DefaultTheme.SidebarItem[] = [
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          link: '/guide/svelte/basics/color',
        },
        {
          text: 'Sizing',
          link: '/guide/svelte/basics/sizing',
        },
        {
          text: 'Stroke width',
          link: '/guide/svelte/basics/stroke-width',
        },
      ],
    },
    // TODO: Add this section
    {
      text: 'Advanced',
      items: [
        {
          text: 'Accessibility',
          link: '/guide/svelte/advanced/accessibility',
        },
        {
          text: 'Global styling',
          link: '/guide/svelte/advanced/global-styling',
        },
        // {
        //   text: 'Animations',
        // },
        {
          text: 'Filled icons',
          link: '/guide/svelte/advanced/filled-icons',
        },
        {
          text: 'Aliased Names',
          link: '/guide/svelte/advanced/aliased-names',
        },
        // {
        //   text: 'Combining icons',
        // },
        // {
        //   text: 'Dynamic imports'
        // },
        // {
        //   text: 'Auto importing'
        // },
      ],
    },
  ]
