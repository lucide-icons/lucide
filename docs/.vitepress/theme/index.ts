import { h, nextTick, onMounted, watch } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import 'virtual:group-icons.css'
import { Theme, useRouter } from 'vitepress';
import IconsSidebarNavAfter from './layouts/IconsSidebarNavAfter.vue';
import HomeHeroIconsCard from './components/home/HomeHeroIconsCard.vue';
import HomeHeroAfter from './components/home/HomeHeroAfter.vue';
import HomeHeroBefore from './components/home/HomeHeroBefore.vue';
import { ICON_STYLE_CONTEXT, iconStyleContext } from './composables/useIconStyle';
import { CATEGORY_VIEW_CONTEXT, categoryViewContext } from './composables/useCategoryView';
import { EXTERNAL_LIBS_CONTEXT, externalLibContext } from './composables/useExternalLibs';
import FrameworkSelect from './components/guide/FrameworkSelect.vue';
import SnackPlayer from './components/editors/SnackPlayer.vue';

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-before': () => h(FrameworkSelect),
      'home-hero-before': () => h(HomeHeroBefore),
      'sidebar-nav-after': () => h(IconsSidebarNavAfter),
      'home-hero-image': () => h(HomeHeroIconsCard),
      'home-hero-actions-after': () => h(HomeHeroAfter),
    });
  },
  enhanceApp({ app }) {
    app.provide(ICON_STYLE_CONTEXT, iconStyleContext);
    app.provide(CATEGORY_VIEW_CONTEXT, categoryViewContext);
    app.provide(EXTERNAL_LIBS_CONTEXT, externalLibContext);
    app.component('SnackPlayer', SnackPlayer)
  },
};

export default theme;
