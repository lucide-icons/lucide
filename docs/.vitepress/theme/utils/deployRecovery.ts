import type { Router } from 'vitepress';

declare global {
  interface Window {
    __VP_HASH_MAP__?: Record<string, string>;
  }
}

const RELOAD_KEY = 'lucide-deploy-reload';
// A second reload within this window means the reload didn't help, so stop to avoid a loop.
const RELOAD_GUARD_MS = 10_000;

/**
 * Reloads the page once, so the browser picks up the HTML and chunks of the latest deploy.
 * Returns false when a reload already happened moments ago, to avoid reload loops.
 */
function reloadOnce(href?: string) {
  try {
    const lastReload = Number(sessionStorage.getItem(RELOAD_KEY));
    if (lastReload && Date.now() - lastReload < RELOAD_GUARD_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Reloading once is still safe,
    // because the fresh page load runs on the new deploy and won't hit the same error.
  }

  if (href) window.location.assign(href);
  else window.location.reload();

  return true;
}

/**
 * Recovers tabs that were opened before a deploy and keep navigating after it.
 *
 * Every deploy renames the hashed chunks, and the old ones are gone from the server. That
 * causes two kinds of errors in long-lived tabs:
 *
 * - Lazy chunks (async components, dynamic imports) fail to load: "Failed to fetch dynamically
 *   imported module" or "Unexpected token '<'" when the 404 page is served as JS. Vite fires
 *   `vite:preloadError` for these.
 * - When a page chunk is missing, VitePress fetches the new `hashmap.json` and loads the page
 *   chunk of the new deploy. That chunk imports a second copy of the theme, with new
 *   `Symbol()` injection keys that the running app never provided, so components throw
 *   "useIconStyleContext must be used with useIconStyleProvider" and
 *   "useExternalLibs must be used with externalLibs context".
 *
 * In both cases a full page load of the target URL is the only reliable fix.
 */
export function setupDeployRecovery(router: Router) {
  if (import.meta.env.SSR) return;

  window.addEventListener('vite:preloadError', (event) => {
    if (reloadOnce()) event.preventDefault();
  });

  const initialHashMap = window.__VP_HASH_MAP__;
  const onAfterPageLoad = router.onAfterPageLoad;

  router.onAfterPageLoad = async (href) => {
    // VitePress only replaces the hash map after a page chunk failed to load, which means a
    // new deploy is live and the page it just loaded belongs to it.
    if (initialHashMap && window.__VP_HASH_MAP__ !== initialHashMap && reloadOnce(href)) {
      // Never resolve, so VitePress doesn't render the new deploy's page in the old app.
      return new Promise<void>(() => {});
    }

    return onAfterPageLoad?.(href);
  };
}
