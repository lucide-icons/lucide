import type { App } from 'vue';

const dsn = import.meta.env.VITE_SENTRY_DSN;

/**
 * Initializes Sentry error tracking. Only runs in the browser and when a DSN is configured,
 * and loads the SDK lazily so it doesn't block the initial render.
 */
export function setupSentry(app: App) {
  if (import.meta.env.SSR || !dsn) return;

  import('@sentry/vue').then((Sentry) => {
    Sentry.init({
      app,
      dsn,
      environment: import.meta.env.MODE,
    });
  });
}
