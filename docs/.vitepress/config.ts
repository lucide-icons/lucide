import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'

export function getAllCategoryFiles() {
  const fileNames = fs.readdirSync(path.join('../lucide/categories')).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'));
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lucide",
  description: "Beautiful & consistent icon toolkit made by the community.",
  outDir: '.vercel/output/static',
  vite: {
    plugins: []
  },
  themeConfig: {
    logo: {
      light: '/logo.light.svg',
      dark: '/logo.dark.svg'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/icons/index.md' },
      { text: 'Documentation', link: '/guide/' },
      { text: 'License', link: '/license' },
    ],

    sidebar: {
      'guide':[
        {
          items: [
            { text: 'Markdown Examples', link: '/guide/markdown-examples' },
            { text: 'Runtime API Examples', link: 'docs/api-examples' }
          ]
        }
      ],
      'guide/custom-page': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/guide/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
      'icons': [
        { text: 'All', link: '/icons/' },
        { text: 'Categorized', link: '/icons/categorized' },
        // {
        //   text: 'Categories',
        //   items: [
        //     ...(getAllCategoryFiles().map((category) => ({ text: category, link: `/icons/category/${category}` })))
        //   ]
        // }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
