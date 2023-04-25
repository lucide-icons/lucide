import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { Theme } from 'vitepress'
import IconsSidebarNavAfter from './layouts/IconsSidebarNavAfter.vue'
import HomeHeroIconsCard from '../components/HomeHeroIconsCard.vue'

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(IconsSidebarNavAfter),
      'home-hero-image': () => h(HomeHeroIconsCard)
    })
  },

}

export default theme
