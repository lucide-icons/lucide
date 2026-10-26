import { OpenPanel } from '@openpanel/web';

const clientId = import.meta.env.VITE_OPENPANEL_CLIENT_ID;

/**
 * Shared OpenPanel instance, only created in the browser and when a client ID is configured.
 * Page views are tracked from the VitePress router (see theme/index.ts) instead of
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
