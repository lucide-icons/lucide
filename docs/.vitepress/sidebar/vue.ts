import { DefaultTheme } from "vitepress";

export const vueSidebar: DefaultTheme.SidebarItem[] = [
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          link: '/guide/vue/basics/color',
        },
        {
          text: 'Sizing',
          link: '/guide/vue/basics/sizing',
        },
        {
          text: 'Stroke width',
          link: '/guide/vue/basics/stroke-width',
        },
      ],
    },
    // TODO: Add this section
    {
      text: 'Advanced',
      items: [
        {
          text: 'Accessibility',
          link: '/guide/vue/advanced/accessibility',
        },
        {
          text: 'Global styling',
          link: '/guide/vue/advanced/global-styling',
        },
        // {
        //   text: 'Animations',
        // },
        {
          text: 'Filled icons',
          link: '/guide/vue/advanced/filled-icons',
        },
        {
          text: 'Aliased Names',
          link: '/guide/vue/advanced/aliased-names',
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
    // {
    //   text: 'Packages',
    //   items: [
    //     {
    //       text: 'Lucide',
    //       link: '/guide/packages/lucide',
    //     },
    //     {
    //       text: 'Lucide React',
    //       link: '/guide/packages/lucide-vue',
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
    //       link: '/guide/packages/lucide-vue-native',
    //     },
    //     {
    //       text: 'Lucide Angular',
    //       link: '/guide/packages/lucide-angular',
    //     },
    //     {
    //       text: 'Lucide Pvue',
    //       link: '/guide/packages/lucide-pvue',
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
  ]
