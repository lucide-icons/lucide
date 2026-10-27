import { h, nextTick } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import 'virtual:group-icons.css';
import { Theme } from 'vitepress';
import IconsSidebarNavAfter from './layouts/IconsSidebarNavAfter.vue';
import HomeHeroIconsCard from './components/home/HomeHeroIconsCard.vue';
import HomeHeroAfter from './components/home/HomeHeroAfter.vue';
import HomeHeroInfoBefore from './components/home/HomeHeroInfoBefore.vue';
import { ICON_STYLE_CONTEXT, iconStyleContext } from './composables/useIconStyle';
import { CATEGORY_VIEW_CONTEXT, categoryViewContext } from './composables/useCategoryView';
import { EXTERNAL_LIBS_CONTEXT, externalLibContext } from './composables/useExternalLibs';
import SideBarNavBefore from './layouts/SideBarNavBefore.vue';
import SnackPlayer from './components/editors/SnackPlayer.vue';
import { op, track } from './utils/openpanel';

const theme: Partial<Theme> = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-before': () => h(SideBarNavBefore),
      'home-hero-info-before': () => h(HomeHeroInfoBefore),
      'sidebar-nav-after': () => h(IconsSidebarNavAfter),
      'home-hero-image': () => h(HomeHeroIconsCard),
      'home-hero-actions-after': () => h(HomeHeroAfter),
      // Keep this here for now, we might want to add more things to the top bar in the future
      // 'layout-top': () => h(LayoutTop),
    });
  },
  enhanceApp({ app, router }) {
    app.provide(ICON_STYLE_CONTEXT, iconStyleContext);
    app.provide(CATEGORY_VIEW_CONTEXT, categoryViewContext);
    app.provide(EXTERNAL_LIBS_CONTEXT, externalLibContext);
    app.component('SnackPlayer', SnackPlayer);

    // Only one scroll depth event per page leave: closing a tab fires all the leave events below.
    // Starts as sent, because VitePress also calls onBeforeRouteChange for the initial page load.
    let scrollDepthSent = true;

    function trackScrollDepth() {
      if (scrollDepthSent) return;
      scrollDepthSent = true;

      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;

      track('scroll_depth', { percent });
    }

    // Track before the route changes, VitePress resets the scroll position for the new page.
    router.onBeforeRouteChange = () => {
      if (!import.meta.env.SSR) trackScrollDepth();
    };

    router.onAfterRouteChange = () => {
      scrollDepthSent = false;
      // Wait for VitePress to update the document title before tracking the page view.
      return nextTick(() => op?.screenView());
    };

    if (!import.meta.env.SSR) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          trackScrollDepth();
        } else {
          scrollDepthSent = false;
        }
      });
      window.addEventListener('pagehide', trackScrollDepth);
      window.addEventListener('beforeunload', trackScrollDepth);

      // The hero actions are rendered by VitePress from the home page frontmatter,
      // so clicks on them are picked up with a delegated listener.
      document.addEventListener('click', (event) => {
        const link = (event.target as Element | null)?.closest?.('.VPHero .actions a');
        if (link) {
          track('home_hero_click', { text: link.textContent?.trim() });
        }
      });
    }
  },
};

export default theme;
