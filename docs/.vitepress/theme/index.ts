import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { Theme } from 'vitepress'
import IconsLayout from './layouts/IconsLayout.vue'

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(IconsLayout)
    })
  },

}

export default theme
