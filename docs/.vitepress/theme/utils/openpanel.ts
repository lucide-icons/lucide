import { nextTick } from 'vue';
import type { Router } from 'vitepress';
import { OpenPanel } from '@openpanel/web';

const clientId = import.meta.env.VITE_OPENPANEL_CLIENT_ID;

/**
 * Shared OpenPanel instance, only created in the browser and when a client ID is configured.
 * Page views are tracked from the VitePress router (see `setupTracking`) instead of
 * `trackScreenViews`, so the page title is already updated when the event is sent.
 */
export const op =
  !import.meta.env.SSR && clientId
    ? new OpenPanel({
        clientId,
        apiUrl: 'https://insights.lucide.dev/api',
        trackScreenViews: false,
        trackOutgoingLinks: false,
        trackAttributes: false,
      })
    : undefined;

type TrackProperties = Record<string, unknown>;

/**
 * Track a custom event. No-op during SSR or when OpenPanel isn't configured.
 */
export function track(name: string, properties?: TrackProperties) {
  op?.track(name, properties);
}

const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Track an event only once the input settles, e.g. while dragging a slider.
 * Calls sharing the same `key` replace each other until `delay` has passed.
 */
export function trackDebounced(
  key: string,
  name: string,
  properties?: TrackProperties,
  delay = 1000,
) {
  if (!op) return;

  clearTimeout(debounceTimers.get(key));
  debounceTimers.set(
    key,
    setTimeout(() => {
      debounceTimers.delete(key);
      track(name, properties);
    }, delay),
  );
}

// Only one scroll depth event per page leave: closing a tab fires visibilitychange, pagehide
// and beforeunload. Starts as sent, because VitePress also calls onBeforeRouteChange for the
// initial page load.
let scrollDepthSent = true;

/**
 * Track how far (in percent) the visitor scrolled down the current page.
 * Sends at most once until `resetScrollDepth` is called.
 */
function trackScrollDepth() {
  if (scrollDepthSent) return;
  scrollDepthSent = true;

  const { scrollHeight, clientHeight } = document.documentElement;
  const scrollable = scrollHeight - clientHeight;
  const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;

  track('scroll_depth', { percent });
}

/**
 * Allow the next page leave to be tracked again, e.g. after a route change.
 */
function resetScrollDepth() {
  scrollDepthSent = false;
}

/**
 * Hooks page views, scroll depth and the home hero actions up to the VitePress router and
 * the browser. Called once from `enhanceApp`.
 */
export function setupTracking(router: Router) {
  // Track before the route changes, VitePress resets the scroll position for the new page.
  router.onBeforeRouteChange = () => {
    if (!import.meta.env.SSR) trackScrollDepth();
  };

  router.onAfterRouteChange = () => {
    resetScrollDepth();
    // Wait for VitePress to update the document title before tracking the page view.
    return nextTick(() => op?.screenView());
  };

  if (import.meta.env.SSR) return;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackScrollDepth();
    } else {
      resetScrollDepth();
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
