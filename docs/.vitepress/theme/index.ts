import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { Theme } from 'vitepress'
import IconsSidebarNavAfter from './layouts/IconsSidebarNavAfter.vue'
import HomeHeroIconsCard from '../components/HomeHeroIconsCard.vue'
import { ICON_STYLE_CONTEXT, context } from '../composables/useIconStyle'

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(IconsSidebarNavAfter),
      'home-hero-image': () => h(HomeHeroIconsCard)
    })
  },
  enhanceApp({ app }) {
    app.provide(ICON_STYLE_CONTEXT, context)
  }
}

export default theme
