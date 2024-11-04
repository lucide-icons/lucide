import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import { Theme } from 'vitepress';
import IconsSidebarNavAfter from './layouts/IconsSidebarNavAfter.vue';
import HomeHeroIconsCard from './components/home/HomeHeroIconsCard.vue';
import HomeHeroBefore from './components/home/HomeHeroBefore.vue';
import { ICON_STYLE_CONTEXT, iconStyleContext } from './composables/useIconStyle';
import { CATEGORY_VIEW_CONTEXT, categoryViewContext } from './composables/useCategoryView';
import { EXTERNAL_LIBS_CONTEXT, externalLibContext } from './composables/useExternalLibs';

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(HomeHeroBefore),
      'sidebar-nav-after': () => h(IconsSidebarNavAfter),
      'home-hero-image': () => h(HomeHeroIconsCard),
    });
  },
  enhanceApp({ app }) {
    app.provide(ICON_STYLE_CONTEXT, iconStyleContext);
    app.provide(CATEGORY_VIEW_CONTEXT, categoryViewContext);
    app.provide(EXTERNAL_LIBS_CONTEXT, externalLibContext);
  },
};

export default theme;
