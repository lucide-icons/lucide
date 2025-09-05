import { DefaultTheme, UserConfig } from 'vitepress';

const sidebar: UserConfig<DefaultTheme.Config>['themeConfig']['sidebar'] = {
  guide: [
    {
      text: 'Introduction',
      items: [
        { text: 'What is lucide?', link: '/guide/' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Comparison', link: '/guide/comparison' },
      ],
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          link: '/guide/basics/color',
        },
        {
          text: 'Sizing',
          link: '/guide/basics/sizing',
        },
        {
          text: 'Stroke width',
          link: '/guide/basics/stroke-width',
        },
      ],
    },
    // TODO: Add this section
    {
      text: 'Advanced',
      items: [
        {
          text: 'Accessibility',
          link: '/guide/advanced/accessibility',
        },
        {
          text: 'Global styling',
          link: '/guide/advanced/global-styling',
        },
        // {
        //   text: 'Animations',
        // },
        {
          text: 'Filled icons',
          link: '/guide/advanced/filled-icons',
        },
        {
          text: 'Aliased Names',
          link: '/guide/advanced/aliased-names',
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
    {
      text: 'Packages',
      items: [
        {
          text: 'Lucide',
          link: '/guide/packages/lucide',
        },
        {
          text: 'Lucide React',
          link: '/guide/packages/lucide-react',
        },
        {
          text: 'Lucide Vue',
          link: '/guide/packages/lucide-vue',
        },
        {
          text: 'Lucide Svelte',
          link: '/guide/packages/lucide-svelte',
        },
        {
          text: 'Lucide Solid',
          link: '/guide/packages/lucide-solid',
        },
        {
          text: 'Lucide React Native',
          link: '/guide/packages/lucide-react-native',
        },
        {
          text: 'Lucide Angular',
          link: '/guide/packages/lucide-angular',
        },
        {
          text: 'Lucide Preact',
          link: '/guide/packages/lucide-preact',
        },
        {
          text: 'Lucide Astro',
          link: '/guide/packages/lucide-astro',
        },
        {
          text: 'Lucide Static',
          link: '/guide/packages/lucide-static',
        },
      ],
    },
    {
      text: 'Contributing',
      items: [
        {
          text: 'Icon Design Principles',
          link: '/guide/design/icon-design-guide',
        },
        {
          text: 'Designing in Illustrator',
          link: '/guide/design/illustrator-guide',
        },
        {
          text: 'Designing in InkScape',
          link: '/guide/design/inkscape-guide',
        },
        {
          text: 'Designing in Figma',
          link: '/guide/design/figma-guide',
        },
        {
          text: 'Designing in Affinity Designer',
          link: '/guide/design/affinity-designer-guide',
        },
      ],
    },
  ],
  // This should be here to keep the sidebar shown on the icons page
  icons: [{ text: '', link: '/' }],
};

export default sidebar;
