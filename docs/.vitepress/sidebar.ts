import { DefaultTheme, UserConfig } from "vitepress"

const sidebar: UserConfig<DefaultTheme.Config>['themeConfig']['sidebar'] = {
  'guide':[
    {
      text: 'Introduction',
      items: [
        { text: 'What is lucide?', link: '/guide/' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Comparison', link: '/guide/comparison' }
      ]
    },
    {
      text: 'Basics',
      items: [
        {
          text: 'Color',
          link: '/guide/basics/color'
        },
        {
          text: 'Sizing',
          link: '/guide/basics/sizing'
        },
        {
          text: 'Stroke width',
          link: '/guide/basics/stroke-width'
        },
        {
          text: 'Accessibility',
          link: '/guide/basics/accessibility'
        },
        // {
        //   text: 'What should I use',
        //   link: '/guide/what-should-i-use'
        // },
      ]
    },
    {
      text: 'Advanced',
      items: [
        {
          text: 'Global styling',
        },
        {
          text: 'Animations',
        },
        {
          text: 'Filled icons',
        },
        {
          text: 'Combining icons',
        },
        {
          text: 'Dynamic imports'
        },
        // {
        //   text: 'Auto importing'
        // },
      ]
    },
    {
      text: 'Packages',
      items: [
        {
          text: 'Lucide',
          link: '/guide/packages/lucide'
        },
        {
          text: 'Lucide React',
          link: '/guide/packages/lucide-react'

          // Extra items
          // - nextjs imports
          // Dynamic imports
        },
        {
          text: 'Lucide React Native',
          link: '/guide/packages/lucide-react-native'
        },
        {
          text: 'Lucide Vue',
          link: '/guide/packages/lucide-vue'
        },
        {
          text: 'Lucide Vue Next (Vue 3)',
          link: '/guide/packages/lucide-vue-next'
        },
        {
          text: 'Lucide Svelte',
          link: '/guide/packages/lucide-svelte'
        },
        {
          text: 'Lucide Solid',
          link: '/guide/packages/lucide-solid'
        },
        {
          text: 'Lucide Preact',
          link: '/guide/packages/lucide-preact'
        },
        {
          text: 'Lucide Angular',
          link: '/guide/packages/lucide-angular'
        },
        {
          text: 'Lucide Static',
          link: '/guide/packages/lucide-static'
        },
        {
          text: 'Lucide Flutter',
          link: '/guide/packages/lucide-flutter'
        },
      ]
    },
    {
      text: 'Contributing',
      items: [
        {
          text: 'Icon Design Principles',
          link: '/guide/design/icon-design-guide'
        },
        {
          text: 'Designing in Illustrator',
          link: '/guide/design/illustrator-guide'
        },
        {
          text: 'Designing in InkScape',
          link:  '/guide/design/inkscape-guide'
        },
        {
          text: 'Designing in Figma',
          link: '/guide/design/figma-guide'
        },
      ]
    },
  ],
  'icons': [
    { text: '', link: '/' },
    // { text: 'Categorized', link: '/icons/categorized' },
    // {
    //   text: 'Categories',
    //   items: [
    //     ...(getAllCategoryFiles().map((category) => ({ text: category, link: `/icons/category/${category}` })))
    //   ]
    // }
  ],
}

export default sidebar
